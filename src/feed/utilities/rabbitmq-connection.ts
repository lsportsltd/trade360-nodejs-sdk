import { Options, connect } from 'amqplib';

import {
  STANDARD_AMQP_PLAIN_PORT,
  STANDARD_AMQP_TLS_PORT,
} from './consume-queue-name';

export type RabbitMqConnectionSettings = {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
  sslEnabled: boolean;
};

function isBrokerUnreachableError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /ECONNREFUSED|ECONNRESET|ETIMEDOUT|BrokerUnreachable|frame size|socket hang up/i.test(
    message,
  );
}

function isLikelyTlsFailure(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /certificate|TLS|SSL|UNABLE_TO_VERIFY|self signed|hostname/i.test(message);
}

function isAuthenticationFailure(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /ACCESS_REFUSED|403|authentication|credentials|login/i.test(message);
}

/**
 * Maps common RabbitMQ connection failures to actionable error messages.
 */
export function enhanceRabbitMqConnectionError(
  err: unknown,
  settings: Pick<RabbitMqConnectionSettings, 'hostname' | 'port' | 'vhost' | 'username' | 'sslEnabled'>,
): Error {
  const baseError = err instanceof Error ? err : new Error(String(err));

  if (isAuthenticationFailure(err)) {
    return new Error(
      `RabbitMQ authentication failed for '${settings.hostname}:${settings.port}' (virtual host '${settings.vhost}'). Check username and password, that the user is defined on the broker, and that it is granted access to this virtual host. See inner error: ${baseError.message}`,
    );
  }

  if (
    settings.sslEnabled &&
    settings.port === STANDARD_AMQP_PLAIN_PORT &&
    isBrokerUnreachableError(err)
  ) {
    return new Error(
      `SSL is enabled but Port is ${STANDARD_AMQP_PLAIN_PORT} (plain AMQP). The client then negotiates TLS against a non-TLS listener, which often surfaces as 'Cannot determine the frame size' or connection errors. Set Port to ${STANDARD_AMQP_TLS_PORT} (or the TLS port your broker documents). See inner error: ${baseError.message}`,
    );
  }

  if (
    !settings.sslEnabled &&
    settings.port === STANDARD_AMQP_TLS_PORT &&
    isBrokerUnreachableError(err)
  ) {
    return new Error(
      `SSL is disabled but Port is ${STANDARD_AMQP_TLS_PORT} (TLS/AMQPS). The client speaks plain AMQP while this port typically expects TLS first, which often surfaces as connection or framing errors. Set sslEnabled to true, or use Port ${STANDARD_AMQP_PLAIN_PORT} for plain AMQP. See inner error: ${baseError.message}`,
    );
  }

  if (settings.sslEnabled && isLikelyTlsFailure(err)) {
    return new Error(
      `TLS connection to RabbitMQ at ${settings.hostname}:${settings.port} failed. Confirm the broker uses TLS on this port (often 5671), the host name matches the server certificate (SAN/CN), and the certificate is trusted on this machine. See inner error: ${baseError.message}`,
    );
  }

  return baseError;
}

export type RabbitMqConnectOptions = Options.Connect & {
  servername?: string;
};

export function buildRabbitMqConnectOptions(
  settings: RabbitMqConnectionSettings,
): RabbitMqConnectOptions {
  const { hostname, port, username, password, vhost, sslEnabled } = settings;

  return {
    protocol: sslEnabled ? 'amqps' : 'amqp',
    hostname,
    port,
    username,
    password,
    vhost,
    ...(sslEnabled ? { servername: hostname } : {}),
  };
}

export async function connectToRabbitMq(settings: RabbitMqConnectionSettings) {
  try {
    return await connect(buildRabbitMqConnectOptions(settings));
  } catch (err) {
    throw enhanceRabbitMqConnectionError(err, settings);
  }
}

export function formatRabbitMqConnectionLog(
  settings: Pick<RabbitMqConnectionSettings, 'hostname' | 'port' | 'username' | 'vhost' | 'sslEnabled'>,
  queueName: string,
): string {
  const protocol = settings.sslEnabled ? 'amqps' : 'amqp';
  const connectionString = `${protocol}://${settings.username}:***@${settings.hostname}:${settings.port}/${settings.vhost}`;

  return `connection initialized successfully!\nconnectionString: ${connectionString}\nListen to ${queueName} queue (Ssl=${settings.sslEnabled})`;
}

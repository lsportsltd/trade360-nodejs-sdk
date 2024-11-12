import { isNil } from 'lodash';

import {
  BaseEntity,
  Constructor,
  ConversionError,
  WrappedMessage,
  knownEntityKeys,
} from '@entities';
import { IEntityHandler } from '@feed';
import { TransformerUtil } from '@utilities';
import { ILogger } from '@logger';

import { BodyHandler } from './handler';
import { IBodyHandler, IConsumptionLatency } from './interfaces';

/**
 * Convert json string to WrappedMessage instance
 * @param rawJson json string
 * @returns WrappedMessage instance
 */
function ConvertJsonToMessage(rawJson: string): WrappedMessage {
  try {
    const message: WrappedMessage = TransformerUtil.transform(JSON.parse(rawJson), WrappedMessage);

    return message;
  } catch (err) {
    throw new ConversionError(`failed converting json to wrapped message instance!, err: ${err}`);
  }
}

/**
 * Class that represent message consumption process
 */
export class MessageConsumer {
  private bodyHandlers: Map<number, IBodyHandler> = new Map<number, IBodyHandler>();

  constructor(private logger: ILogger) {}

  /**
   * Handle basic message consumption process
   */
  public async handleBasicMessage(
    messageContent: Uint8Array,
    { messageMqTimestamp, consumptionLatencyThreshold }: IConsumptionLatency,
  ): Promise<void> {
    try {
      if (this.bodyHandlers.size == 0) {
        this.logger?.warn('there is no configured entities handler, please config at least one');
        return;
      }

      const rawMessage = messageContent.toString();

      const { header, body } = ConvertJsonToMessage(rawMessage);

      if (isNil(header)) {
        this.logger?.warn('invalid message format');
        return;
      }

      const { type: entityType, msgGuid } = header;

      const bodyHandler = this.bodyHandlers.get(entityType);

      if (!isNil(bodyHandler)) {
        await bodyHandler.processAsync({ header, body });

        this.checkConsumptionLatency({
          messageMqTimestamp,
          consumptionLatencyThreshold,
          msgGuid,
        });
      } else {
        const missedEntityType = knownEntityKeys.get(entityType);

        if (!isNil(missedEntityType)) {
          this.logger?.warn(`entity handler for ${missedEntityType} is not configured`);
        } else {
          this.logger?.warn(`received unknown entity type ${entityType}`);
        }
        return;
      }
    } catch (err) {
      this.logger?.error(`Error handling message consumption, error: ${err}`);
      throw err;
    }
  }

  /**
   * Check message consumption latency and log warning if it exceeds the threshold value in seconds
   * or log info if it's within the threshold value in seconds.
   */
  public checkConsumptionLatency({
    messageMqTimestamp,
    consumptionLatencyThreshold: thresholdInSeconds,
    msgGuid,
  }: IConsumptionLatency): void {
    if (isNil(messageMqTimestamp) || isNil(thresholdInSeconds)) {
      this.logger.warn(
        'Unable to check message consumption delay: missing message timestamp or threshold',
        { msgGuid },
      );
    } else {
      const consumptionTimestamp = Date.now();
      const delayInSeconds = (consumptionTimestamp - messageMqTimestamp) / 1000;

      if (delayInSeconds > thresholdInSeconds) {
        this.logger.warn('Message consumption delay exceeded threshold', {
          delayInSeconds,
          thresholdInSeconds,
          messageMqTimestamp,
          consumptionTimestamp,
          msgGuid,
        });
      } else {
        this.logger.info('Message consumed within threshold', {
          delayInSeconds,
          thresholdInSeconds,
          msgGuid,
        });
      }
    }
  }

  /**
   * Register new entity handler for specific entity type
   * @param entityHandler entity handler instance that implement
   * IEntityHandler interface
   * @param entityConstructor entity constructor that extends
   * BaseEntity class and has entityKey property in its prototype
   * @throws Error if entityConstructor is not a trade360 entity
   * or if there is an error setting registration for new entity
   * handler
   * @returns void
   */
  public RegisterEntityHandler<TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: Constructor<TEntity>,
  ): void {
    try {
      const {
        name,
        prototype: { entityKey },
      } = entityConstructor;

      if (!entityKey) {
        throw new Error(
          `${name} isn't trade360 entity. You should use only entities from Trade360SDK!`,
        );
      }

      const newBodyHandler = new BodyHandler<TEntity>(
        entityHandler,
        entityConstructor,
        this.logger,
      );

      this.bodyHandlers.set(entityKey, newBodyHandler);
    } catch (err) {
      this.logger?.error(`Error setting registration for new entity handler, error: ${err}`);
      throw err;
    }
  }
}

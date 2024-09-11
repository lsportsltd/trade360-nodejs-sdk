import "reflect-metadata";

import { isNil } from "lodash";

import {
  BaseEntity,
  ConversionError,
  WrappedMessage,
  knownEntityKeys,
} from "@entities";
import { IEntityHandler } from "@feed";

import { TransformerUtil } from "@lsports/entities";
import { BodyHandler } from "./handler";
import { IBodyHandler } from "./interfaces";

/**
 * Class that represent message consumption process
 */
export class MessageConsumer {
  private bodyHandlers: Map<number, IBodyHandler> = new Map<
    number,
    IBodyHandler
  >();

  constructor(private logger: Console) {}

  public HandleBasicMessage = async (
    messageContent: Uint8Array,
    messageMqTimestamp?: number,
    consumptionLatencyThreshold?: number
  ) => {
    try {
      if (this.bodyHandlers.size == 0) {
        this.logger?.warn(
          "there is no configured entities handler, please config at least one"
        );
        return;
      }

      const rawMessage = messageContent.toString();

      const { header, body } = ConvertJsonToMessage(rawMessage);

      if (isNil(header)) {
        this.logger?.warn("invalid message format");
        return;
      }

      const { type: entityType } = header;

      if (this.bodyHandlers.has(entityType)) {
        const bodyHandler = this.bodyHandlers.get(entityType);

        await bodyHandler!.processAsync(header, body);

        this.checkConsumptionLatency(
          messageMqTimestamp,
          consumptionLatencyThreshold
        );
      } else {
        const missedEntityType = knownEntityKeys.get(entityType);

        if (!isNil(missedEntityType)) {
          this.logger?.warn(
            `entity handler for ${missedEntityType} is not configured`
          );
        } else {
          this.logger?.warn(`received unknown entity type ${entityType}`);
        }
        return;
      }
    } catch (err) {
      this.logger?.error(`Error handling message consumption, error: ${err}`);
      throw err;
    }
  };

  public checkConsumptionLatency = (
    messageMqTimestamp?: number,
    thresholdInSeconds?: number
  ): void => {
    if (isNil(messageMqTimestamp) || isNil(thresholdInSeconds)) {
      this.logger.warn(
        "Unable to check message consumption delay: missing message timestamp or threshold"
      );
    } else {
      const consumptionTimestamp = Date.now();
      const delayInSeconds = (consumptionTimestamp - messageMqTimestamp) / 1000;

      if (delayInSeconds > thresholdInSeconds) {
        this.logger.warn("Message consumption delay exceeded threshold", {
          delayInSeconds,
          thresholdInSeconds,
          messageMqTimestamp,
          consumptionTimestamp,
        });
      } else {
        this.logger.info("Message consumed within threshold", {
          delayInSeconds,
          thresholdInSeconds,
        });
      }
    }
  };

  public RegisterEntityHandler = <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ): void => {
    try {
      const {
        name,
        prototype: { entityKey },
      } = entityConstructor;

      if (!entityKey) {
        throw new Error(
          `${name} isn't trade360 entity. You should use only entities from Trade360SDK!`
        );
      }

      const newBodyHandler = new BodyHandler<TEntity>(
        entityHandler,
        entityConstructor,
        this.logger
      );

      this.bodyHandlers.set(entityKey, newBodyHandler);
    } catch (err) {
      this.logger?.error(
        `Error setting registration for new entity handler, error: ${err}`
      );
      throw err;
    }
  };
}

const ConvertJsonToMessage = (rawJson: string) => {
  try {
    const message: WrappedMessage = TransformerUtil.deserialize(
      JSON.parse(rawJson),
      WrappedMessage
    );

    return message;
  } catch (err) {
    throw new ConversionError(
      `failed converting json to wrapped message instance!, err: ${err}`
    );
  }
};

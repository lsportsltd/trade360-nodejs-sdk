import "reflect-metadata";

import { instanceToPlain, plainToInstance } from "class-transformer";
import { isNil } from "lodash";

import {
  BaseEntityClass,
  WrappedMessage,
  knownEntityKeys,
} from "../../../entities";
import { IEntityHandler } from "../../IEntityHandler";
import { ConversionError } from "../../exeptions";
import { BodyHandler } from "./handler";
import { IBodyHandler } from "./interfaces";
import { MessageHeader } from "../../../entities/message-wrappers/messageHeader";

/**
 * Class that represent message consumption process
 */
export class MessageConsumer {
  private bodyHandlers: Map<number, IBodyHandler> = new Map<
    number,
    IBodyHandler
  >();

  constructor(private logger?: Console) {}

  public HandleBasicMessage = async (messageContent: any) => {
    try {
      if (this.bodyHandlers.size == 0) {
        this.logger?.warn(
          "there is no configured entities handler, \
          please config at least one"
        );
        return;
      }

      const rawMessage = messageContent.toString();

      const { Header: header, Body: body } = ConvertJsonToMessage(rawMessage);

      if (isNil(header)) {
        this.logger?.warn("invalid message format");
        return;
      }

      const { Type: entityType } = header;

      if (this.bodyHandlers.has(entityType)) {
        const bodyHandler = this.bodyHandlers.get(entityType);

        await bodyHandler!.processAsync(body);
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
    } catch (ex) {
      this.logger?.error("Error handling message consumption", ex);
    }
  };

  public RegisterEntityHandler = <TEntity extends BaseEntityClass>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ): void => {
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
  };
}

const ConvertJsonToMessage = (rawJson: string) => {
  try {
    const doc = JSON.parse(rawJson);

    const message: WrappedMessage = plainToInstance(WrappedMessage, doc);

    return message;
  } catch (err) {
    throw new ConversionError(
      `failed converting json to wrapped message instance!, err: ${err}`
    );
  }
};

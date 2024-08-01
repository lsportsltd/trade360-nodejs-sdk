import { plainToInstance } from "class-transformer";
import { isNil } from "lodash";

import { BaseEntityClass, WrappedMessage } from "../../../entities";
import { IEntityHandler } from "../../IEntityHandler";
import { ConversionError } from "../../exeptions";
import { BodyHandler } from "./handler";
import { IBodyHandler } from "./interfaces";

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
        this.logger?.warn("Invalid message format");
        return;
      }

      const { Type: entityType } = header;

      if (this.bodyHandlers.has(entityType)) {
        const bodyHandler = this.bodyHandlers.get(entityType);

        await bodyHandler!.processAsync(body);
      } else {
        // TODO: handle if the entity type is not handled or not exist as entity type
        const missedEntityType = entityType;

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
      this.logger?.error(ex, "Error handling message consumption");
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

const localHandleBody = <TEntity extends BaseEntityClass>(
  body: string,
  entityHandler: IEntityHandler<TEntity>,
  entityConstructor: new (...args: any[]) => TEntity
) => {
  const entity = !isNil(body)
    ? plainToInstance(entityConstructor, body)
    : undefined;
  // return entityHandler.processAsync(entity);
};

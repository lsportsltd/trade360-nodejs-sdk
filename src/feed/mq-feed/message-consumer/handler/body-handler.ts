import { isNil } from "lodash";

import { IEntityHandler } from "@feed";
import { BaseEntity, MessageHeader } from "@entities";

import { IBodyHandler } from "../interfaces";
import { TransformerUtil } from "@lsports/entities";

export class BodyHandler<TEntity extends BaseEntity> implements IBodyHandler {
  constructor(
    private readonly entityHandler: IEntityHandler<TEntity>,
    private readonly entityConstructor: new () => TEntity,
    private readonly logger?: Console
  ) {}

  async processAsync(header: MessageHeader, body: string): Promise<void> {
    try {
      const entity = !isNil(body)
        ? TransformerUtil.deserialize(JSON.parse(body), this.entityConstructor)
        : undefined;

      return this.entityHandler.processAsync(header, entity);
    } catch (err) {
      this.logger?.warn(
        `Failed to deserialize ${typeof this
          .entityConstructor} entity, Due to: ${err}`
      );
    }
  }
}

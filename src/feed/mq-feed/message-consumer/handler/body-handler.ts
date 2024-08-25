import { plainToClass, plainToInstance } from "class-transformer";
import { isNil } from "lodash";

import { BaseEntity } from "../../../../entities";
import { IEntityHandler } from "../../../IEntityHandler";
import { IBodyHandler } from "../interfaces";

// export class BodyHandler<TEntity extends BaseEntityClass> implements IBodyHandler {
export class BodyHandler<TEntity extends BaseEntity> implements IBodyHandler {
  constructor(
    private readonly entityHandler: IEntityHandler<TEntity>,
    private readonly entityConstructor: new () => TEntity,
    private readonly logger?: Console
  ) {}

  async processAsync(body: string): Promise<void> {
    try {
      const entity = !isNil(body)
        ? plainToInstance(this.entityConstructor, JSON.parse(body), {
            excludeExtraneousValues: false, // Change this to false if you want to keep all properties
          })
        : undefined;

      return this.entityHandler.processAsync(entity);
    } catch (err) {
      this.logger?.warn(
        `Failed to deserialize ${typeof this
          .entityConstructor} entity, Due to: ${err}`
      );
    }
  }

  async deserialize<TEntity>(
    json: Record<string, any>,
    targetClass: new () => TEntity
  ): Promise<TEntity> {
    return plainToClass(targetClass, json);
  }
}

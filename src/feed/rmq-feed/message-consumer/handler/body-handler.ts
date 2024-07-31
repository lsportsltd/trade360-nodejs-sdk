import {
  plainToClass,
  plainToInstance,
  ClassConstructor,
} from "class-transformer";
import { IEntityHandler } from "../../../IEntityHandler";
import { IBodyHandler } from "../interfaces";
import { isNil } from "lodash";
import { BaseEntityClass } from "../../../../entities";

export class BodyHandler<T extends BaseEntityClass> implements IBodyHandler {
  constructor(
    private readonly entityHandler: IEntityHandler<T>,
    private readonly entityConstructor: new () => T,
    private readonly logger?: Console
  ) {}

  async deserialize<T>(
    json: Record<string, any>,
    targetClass: new () => T
  ): Promise<T> {
    return plainToClass(targetClass, json);
  }

  async processAsync(body: string): Promise<void> {
    try {
      // entity = !isNil(body) ?? this.deserialize(JSON.parse(body),T);
      const entity = !isNil(body)
        ? plainToInstance(this.entityConstructor, body)
        : undefined;

      return this.entityHandler.processAsync(entity);
    } catch (err) {
      this.logger?.warn(
        `Failed to deserialize ${typeof this
          .entityConstructor} entity, Due to: ${err}`
      );
    }
  }
}

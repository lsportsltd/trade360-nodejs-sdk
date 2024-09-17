import { plainToInstance } from 'class-transformer';

import { BaseEntity } from '@entities';

export class TransformerUtil {
  /**
   * Deserialize a plain object to an instance of the specified class.
   * @param plainObject The plain object to deserialize
   * @param targetClass The class to instantiate
   * @returns
   */
  // TODO: keep better name for this method or class for better representation
  public static deserialize<TEntity extends BaseEntity>(
    plainObject: Record<string, never> | BaseEntity,
    targetClass: new () => TEntity,
  ): TEntity {
    return plainToInstance(targetClass, plainObject, {
      excludeExtraneousValues: true, // Change this to false if you want to keep all properties
      exposeUnsetFields: false,
    });
  }

  /**
   * Deserialize an array of plain objects to an array of instances of the specified class.
   * @param plainArray The array of plain objects to deserialize
   * @param targetClass The class to instantiate
   */
  public static deserializeArray<TEntity extends BaseEntity>(
    plainArray: Record<string, unknown>[],
    targetClass: new () => TEntity,
  ): TEntity[] {
    return plainToInstance(targetClass, plainArray, {
      excludeExtraneousValues: true, // Change this to false if you want to keep all properties
      exposeUnsetFields: false,
    });
  }
}

import { plainToInstance } from 'class-transformer';

import { BaseEntity } from '@entities';

export class TransformerUtil {
  /**
   * Deserialize a plain object to an instance of the specified class.
   * @param plainObject The plain object to deserialize
   * @param targetClass The class to instantiate
   * @returns An instance of the specified class, TEntity, with the properties
   *  set according to the plain object provided
   */
  public static transform<TEntity extends BaseEntity>(
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
   * @returns An array of instances of the specified class, TEntity, with the properties
   * set according to the plain objects provided
   */
  public static transformArray<TEntity extends BaseEntity>(
    plainArray: Record<string, unknown>[],
    targetClass: new () => TEntity,
  ): TEntity[] {
    return plainToInstance(targetClass, plainArray, {
      excludeExtraneousValues: true, // Change this to false if you want to keep all properties
      exposeUnsetFields: false,
    });
  }
}

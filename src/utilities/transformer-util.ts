import { ClassConstructor, plainToInstance } from 'class-transformer';

import { BaseEntity, ConversionError } from '@entities';

export class TransformerUtil {
  /**
   * Deserialize a plain object to an instance of the
   * specified class.
   * @param plainObject The plain object to deserialize
   * @param targetClass The class to instantiate with the
   * properties set according to the plain object provided
   * @returns An instance of the specified class, TEntity,
   * with the properties set according to the plain object
   * provided
   */
  public static transform<TEntity extends BaseEntity>(
    plainObject: BaseEntity,
    targetClass: ClassConstructor<TEntity>,
  ): TEntity {
    try {
      return plainToInstance(targetClass, plainObject, {
        excludeExtraneousValues: true, // Change this to false if you want to keep all properties
        exposeUnsetFields: false,
      });
    } catch (err) {
      // Create a safe error that doesn't contain BigInt values that could cause serialization issues
      const safeError = new Error(err instanceof Error ? err.message : String(err));
      throw new ConversionError(targetClass.name, safeError);
    }
  }

  /**
   * Deserialize an array of plain objects to an array of
   * instances of the specified class.
   * @param plainArray The array of plain objects to
   * deserialize
   * @param targetClass The class to instantiate with the
   * properties set according to the plain objects provided
   * @returns An array of instances of the specified class,
   * TEntity, with the properties set according to the plain
   * objects provided
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

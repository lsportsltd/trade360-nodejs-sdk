// import { BaseEntity } from '@entities';

// type BaseEntityClass = new (...args: never[]) => {
//   [key: string]: never;
// };

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

/**
 * Type for constructable classes that extend BaseEntity
 */
type Constructor<T extends BaseEntity = BaseEntity> = new (...args: unknown[]) => T;

/**
 * Interface for mapping between different types of objects
 * in the application using the mapping configurations provided
 * in the application. Provides functionality similar to C# AutoMapper
 * with configuration profiles. The IMapper interface is used to map
 * between different types of objects in the application using the
 * mapping configurations provided in the application.
 */
export interface IMapper {
  /**
   * Maps a source object to a new instance of the destination type using
   * the mapping function provided in the configuration profile for the
   * mapping between the two types of objects in the application.
   * @param source The source object to map from with properties to map
   * to the destination type using the mapping function provided in the
   * configuration profile for the mapping between the two types of objects
   * in the application
   * @param destination The constructor of the destination type to map to
   * the source object using the mapping function provided in the
   * configuration profile for the mapping between the two types of
   * objects in the application with properties to map to the destination
   * type using the mapping function provided in the configuration profile
   * @returns A new instance of the destination type with mapped properties
   * using the mapping function provided in the configuration profile for
   * the mapping between the two types of objects in the application
   * @throws Error if mapping configuration is not found in the application
   * or if the mapping function provided in the configuration profile for
   * the mapping between the two types of objects in the application is not
   * found in the application or if the mapping function provided in the
   * configuration profile for the mapping between the two types of objects
   */
  map<S extends BaseEntity, D extends BaseEntity>(source: S, destinationType: Constructor<D>): D;
}

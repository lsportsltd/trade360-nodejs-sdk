/**
 * Generic base class for collection responses from the metadata API.
 * Provides a common structure for responses containing collections of typed data.
 *
 * @template T The type of items in the data collection
 */
export abstract class BaseCollectionResponse<T> {
  [key: string]: unknown;

  /**
   * Generic data collection property.
   * Concrete classes should override this with proper decorators.
   */
  abstract data?: T[];
}

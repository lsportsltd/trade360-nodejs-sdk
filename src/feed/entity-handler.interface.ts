import { BaseEntity } from '@entities';

import { IMessageStructure } from '@feed/mq-feed';

/**
 * Interface that represent every entity handler
 * required implementation for the feed service
 * to handle the entity type with the entityHandler
 * call-back function for the entityConstructor class
 * type entity type
 * 
 * @remarks 
 * - The entity handler interface uses `processAsync()` method, not `handle()`.
 * - All entity handlers must implement this method to process entity updates.
 * - **Important:** Entities are wrapped in metadata update classes with `events[]` arrays, not direct access.
 *   For example, `FixtureMetadataUpdate` contains `events: FixtureEvent[]`, not direct fixture properties.
 * 
 * @example
 * ```typescript
 * class MyHandler implements IEntityHandler<FixtureMetadataUpdate> {
 *   async processAsync({ header, entity, transportHeaders }: IMessageStructure<FixtureMetadataUpdate>) {
 *     // Entities are wrapped in metadata update classes with events[] arrays
 *     if (entity?.events) {
 *       entity.events.forEach((event) => {
 *         // Access event properties, not entity properties directly
 *         console.log('Fixture Event:', event);
 *       });
 *     }
 *   }
 * }
 * ```
 */
export interface IEntityHandler<TEntity extends BaseEntity> {
  /**
   * Processes an entity update asynchronously.
   * @param header - Message header containing metadata
   * @param entity - The entity instance wrapped in a metadata update class with `events[]` array.
   *                 Entities are NOT accessed directly - they are wrapped in update classes like
   *                 `FixtureMetadataUpdate`, `MarketUpdate`, `LivescoreUpdate`, etc., each containing
   *                 an `events[]` array with the actual entity data.
   * @param transportHeaders - Transport message headers
   * @returns Promise that resolves when processing is complete
   */
  processAsync: ({ header, entity, transportHeaders }: IMessageStructure<TEntity>) => Promise<void>;
}

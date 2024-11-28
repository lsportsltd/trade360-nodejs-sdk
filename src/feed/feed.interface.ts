import { BaseEntity, Constructor } from '@entities';

import { IEntityHandler } from './entity-handler.interface';

/**
 * Interface that represent Feed implementation
 */
export interface IFeed {
  /**
   * start consuming messages, process connect creation,
   * attach listeners for reconnection and consumption
   * process and handle them with all the configured
   * desired handlers for entities types
   * @param preConnectionAtStart boolean to determine
   * whether to run a pre-connection process, check
   * distribution status and if necessary start distribution
   * @returns void
   */
  start: (preConnectionAtStart?: boolean) => Promise<void>;

  /**
   * stop consuming messages from mq and handle them with
   * all the configured desired handlers for entities types
   * @returns void
   */
  stop: () => Promise<void>;

  /**
   * Add new configured entity handler for the feed service
   * to handle the entity type with the entityHandler call-back
   * function for the entityConstructor class type entity type
   * @param entityHandler call-back function represents the
   * desire handle procedure for the entity type
   * @param entityConstructor class constructor represent
   * the entity type to be handled by the entityHandler
   * call-back function
   * @returns void
   */
  addEntityHandler: <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: Constructor<TEntity>,
  ) => void;
}

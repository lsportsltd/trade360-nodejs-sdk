import { BaseEntity } from "../entities";
import { IEntityHandler } from "./IEntityHandler";

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
   * Add new configured entity handler
   * @param entityHandler call-back function represents the desire handle procedure
   * @param entityConstructor class constructor represent the entity
   * @returns void
   */
  addEntityHandler: <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => void;
}

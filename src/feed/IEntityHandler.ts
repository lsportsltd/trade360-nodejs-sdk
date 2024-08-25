import { BaseEntity } from "../entities";

/**
 * Interface that represent every entity handler required implementation
 */
// export interface IEntityHandler<TEntity extends BaseEntityClass> {
export interface IEntityHandler<TEntity extends BaseEntity> {
  processAsync: (entity?: TEntity) => Promise<void>;
}

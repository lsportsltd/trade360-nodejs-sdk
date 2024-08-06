import { BaseEntityClass } from "../entities";

/**
 * Interface that represent every entity handler required implementation 
 */
export interface IEntityHandler<TEntity extends BaseEntityClass> {
  processAsync: (entity?: TEntity) => Promise<void>; 
}
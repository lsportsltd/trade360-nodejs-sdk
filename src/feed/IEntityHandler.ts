import { BaseEntityClass } from "../entities";

export interface IEntityHandler<TEntity extends BaseEntityClass> {
  processAsync: (entity?: TEntity) => Promise<void>; 
}
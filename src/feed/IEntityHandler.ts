import { BaseEntityClass } from "../entities";

export interface IEntityHandler<T extends BaseEntityClass> {
  processAsync: (entity?: T) => Promise<void>; 
}
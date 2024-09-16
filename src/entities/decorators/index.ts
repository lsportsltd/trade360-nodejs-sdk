import { knownEntityKeys } from '../message-types';

// Custom decorator to attach a unique value to each entity class
export const EntityKey = (value: number) => {
  return function (constructor: new () => unknown): void {
    constructor.prototype.entityKey = value;
    knownEntityKeys.set(value, constructor.name);
  };
};

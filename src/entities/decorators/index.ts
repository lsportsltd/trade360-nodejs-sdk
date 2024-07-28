// Custom decorator to attach a unique value to each entity class
// export const EntityType = (value: number) => {
export function EntityType(value: number) {
  return function (target: any) {
    target.prototype.entityType = value;
  };
}

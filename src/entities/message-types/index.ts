export type BaseEntityClass = {
  [key: string]: any; // Allow any properties
  constructor: Function; // Ensure it's a class type
};

export let knownEntityKeys: Map<number, string> = new Map<number, string>();

export const setNewEntityKeyToMap = (key: number, name: string) => {
  knownEntityKeys.set(key, name);
};

export * from "./fixture-metadata-update";

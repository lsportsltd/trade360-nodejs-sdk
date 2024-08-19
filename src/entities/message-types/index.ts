export type BaseEntityClass = {
  [key: string]: any; // Allow any properties
  constructor: Function; // Ensure it's a class type
};

export let knownEntityKeys: Map<number, string> = new Map<number, string>();

export const setNewEntityKeyToMap = (key: number, name: string) => {
  knownEntityKeys.set(key, name);
};

export * from "./fixture-metadata-update";
export * from "./livescore-update";
export * from "./market-update";
export * from "./settlement-update";
export * from "./outright-fixture-update";
export * from "./outright-score-update";
export * from "./outright-fixture-market-update";
export * from "./outright-settlements-update";
export * from "./heartbeat-update"
export * from "./keep-alive-update"
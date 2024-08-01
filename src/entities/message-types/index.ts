export * from "./fixture-metadata-update";

export type BaseEntityClass = {
  [key: string]: any; // Allow any properties
  constructor: Function; // Ensure it's a class type 
};

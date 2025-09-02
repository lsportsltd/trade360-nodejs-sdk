/**
 * Base interface for all entities that can be mapped
 */
export interface BaseEntity {
  [key: string]: unknown;
}

/**
 * Type for constructable classes that extend BaseEntity interface
 * type definition for the BaseEntity class to be constructed in
 * the application.
 * @param T The type of the BaseEntity class to be constructed
 * @returns A new instance of the BaseEntity class
 */
export type Constructor<T extends BaseEntity = BaseEntity> = new (...args: unknown[]) => T;
// export type BaseEntity2<T extends BaseEntity> = InstanceType<T>;

export const knownEntityKeys: Map<number, string> = new Map<number, string>();

export function setNewEntityKeyToMap(key: number, name: string): void {
  knownEntityKeys.set(key, name);
}

export * from './fixture-metadata-update';
export * from './livescore-update';
export * from './market-update';
export * from './settlement-update';

export * from './outright-fixture-update';
export * from './outright-score-update';
export * from './outright-fixture-market-update';
export * from './outright-settlements-update';

export * from './heartbeat-update';
export * from './keep-alive-update';

export * from './outright-league-fixture-update';
export * from './outright-league-market-update';
export * from './outright-league-settlement-update';

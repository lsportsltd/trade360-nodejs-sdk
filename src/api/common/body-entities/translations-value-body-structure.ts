import { LocalizedValue } from './localized-value';

/**
 * LocalizedValueBodyStructure type is responsible
 * for defining the structure of the localized value.
 */
export type TranslationsBodyStructure = Record<number, LocalizedValue[]>;

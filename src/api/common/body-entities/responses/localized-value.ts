import { Expose } from 'class-transformer';

/**
 * LocalizedValue class is responsible for
 * deserializing the response from the metadata
 * API to a localized value.
 */
export class LocalizedValue {
  @Expose({ name: 'LanguageId' })
  languageId!: number;

  @Expose({ name: 'Value' })
  value?: string;
}

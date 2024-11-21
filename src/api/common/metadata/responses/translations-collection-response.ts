import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

import { TranslationsBodyStructure } from '@api/common/body-entities';

/**
 * TranslationsCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of translations.
 */
export class TranslationsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Sports' })
  sports?: TranslationsBodyStructure;

  @Expose({ name: 'Leagues' })
  leagues?: TranslationsBodyStructure;

  @Expose({ name: 'Locations' })
  locations?: TranslationsBodyStructure;

  @Expose({ name: 'Markets' })
  markets?: TranslationsBodyStructure;

  @Expose({ name: 'Participants' })
  participants?: TranslationsBodyStructure;
}

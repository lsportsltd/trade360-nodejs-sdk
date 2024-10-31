import { Expose } from 'class-transformer';

import { TranslationsBodyStructure } from '../body-entities';

/**
 * Translations Collection Response class
 * (used for serialization) - represents the response
 * body of the translations collection endpoint.
 */
export class TranslationsCollectionResponse {
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

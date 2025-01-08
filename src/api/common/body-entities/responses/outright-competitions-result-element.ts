import { Expose, Type } from 'class-transformer';

import { OutrightCompetition } from './outright-competition';

/**
 * Outright Competition Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright competition body structure.
 */
export class OutrightCompetitionsResultElement {
  @Expose({ name: 'id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Type' })
  type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightCompetition)
  events: OutrightCompetition[] = [];
}

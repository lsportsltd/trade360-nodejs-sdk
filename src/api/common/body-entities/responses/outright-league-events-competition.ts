"use strict";

import { Expose, Type } from 'class-transformer';

import { OutrightLeagueEventBodyStructure } from './outright-league-event-body-structure';

/**
 * Outright League Events Competition Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright league events competition body structure.
 */
export class OutrightLeagueEventsCompetition {
  @Expose({ name: 'id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Type' })
  type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightLeagueEventBodyStructure)
  events: OutrightLeagueEventBodyStructure[] = [];
}

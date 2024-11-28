import { Expose } from 'class-transformer';

/**
 * CompetitionsSubscriptionRequestBodyStructure class for sending
 * request to subscribe to competitions from the API. It contains
 * the properties for the request to subscribe to competitions from
 * the API.
 */
export class CompetitionsSubscriptionRequestBodyStructure {
  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportId' })
  sportId!: number;

  @Expose({ name: 'LocationId' })
  locationId?: number;

  @Expose({ name: 'leagueId' })
  leagueId?: number;
}

import { Expose } from 'class-transformer';

/**
 * LeagueSubscriptionRequestBodyStructure class is responsible
 * for sending requests to the subscription API to subscribe
 * to leagues. It is a HTTP request DTO for subscribing to
 * leagues in the subscription API.
 */
export class LeagueSubscriptionRequestBodyStructure {
  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportId' })
  sportId!: number;

  @Expose({ name: 'LocationId' })
  locationId!: number;

  @Expose({ name: 'LeagueId' })
  leagueId!: number;
}

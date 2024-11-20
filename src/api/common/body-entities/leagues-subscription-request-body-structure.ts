import { Expose } from 'class-transformer';

/**
 * LeaguesSubscriptionRequestBodyStructure class is responsible
 * for sending requests to the subscription API to subscribe
 * to leagues. It is a HTTP request DTO for subscribing to
 * leagues in the subscription API.
 */
export class LeaguesSubscriptionRequestBodyStructure {
  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  sportId!: number;

  @Expose()
  locationId!: number;

  @Expose()
  leagueId!: number;
}

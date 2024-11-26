import { Expose, Type } from 'class-transformer';

import { RequestSuspendedMarket } from './request-suspended-markets';

/**
 * ManualSuspensionRequestBodyStructure class is
 * responsible for deserializing the request body
 * for manual suspension.
 */
export class ManualSuspensionsRequestBodyStructure {
  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  sportId?: number;

  @Expose()
  locationId?: number;

  @Expose()
  competitionId?: number;

  @Expose()
  fixtureId!: number;

  @Expose()
  @Type(() => RequestSuspendedMarket)
  markets: RequestSuspendedMarket[] = [];
}

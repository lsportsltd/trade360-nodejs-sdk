import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * FixturesSubscriptionRequestDto class for sending
 * request to subscribe by fixtures to the API.
 * It contains the properties for the request to subscribe by
 * fixtures to the API.
 * @param fixtures The fixture IDs to subscribe by
 * in the request to subscribe by fixtures to the API.
 * @returns FixturesSubscriptionRequestDto instance that
 * contains the provided fixture IDs.
 */
export class FixturesSubscriptionRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Fixtures' })
  fixtures?: number[];
}

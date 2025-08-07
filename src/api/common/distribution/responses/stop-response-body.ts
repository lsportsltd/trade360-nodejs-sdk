import { Expose } from 'class-transformer';

import { StopMessage } from '@api/common';
import { BaseEntity } from '@lsports/entities';

/**
 * StopResponseBody class is responsible for
 * deserializing the response from the distribution
 * API to a stop response body.
 */
export class StopResponseBody implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Message' })
  message!: StopMessage;
}

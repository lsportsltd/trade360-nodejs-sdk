import { Expose } from 'class-transformer';

import { StartMessage } from '@api/common';
import { BaseEntity } from '@lsports/entities';

/**
 * StartResponseBody class is responsible for
 * deserializing the response from the distribution
 * API to a start response body.
 */
export class StartResponseBody implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Message' })
  message!: StartMessage;
}

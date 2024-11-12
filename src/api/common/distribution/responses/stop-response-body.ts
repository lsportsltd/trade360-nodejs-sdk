import { Expose } from 'class-transformer';

import { StopMessage } from '@api/common';
import { BaseEntity } from '@entities';

export class StopResponseBody implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Message' })
  message!: StopMessage;
}

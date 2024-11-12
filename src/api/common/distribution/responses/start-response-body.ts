import { Expose } from 'class-transformer';

import { StartMessage } from '@api/common';
import { BaseEntity } from '@entities';

export class StartResponseBody implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Message' })
  message!: StartMessage;
}

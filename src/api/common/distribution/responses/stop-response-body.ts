import { Expose } from 'class-transformer';

import { StopMessage } from '@api/common';

export class StopResponseBody {
  @Expose({ name: 'Message' })
  message!: StopMessage;
}

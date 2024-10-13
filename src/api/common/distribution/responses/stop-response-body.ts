import { StopMessage } from '@api/common';
import { Expose } from 'class-transformer';

export class StopResponseBody {
  @Expose({ name: 'Message' })
  message!: StopMessage;
}

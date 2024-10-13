import { Expose } from 'class-transformer';

import { StartMessage } from '@api/common';

export class StartResponseBody {
  @Expose({ name: 'Message' })
  message!: StartMessage;
}

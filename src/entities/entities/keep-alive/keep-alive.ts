import { Expose, Type } from 'class-transformer';

import { NameValueRecord } from '@lsports/entities/common';

export class KeepAlive {
  @Expose({ name: 'ActiveEvents' })
  public activeEvents?: number[];

  @Expose({ name: 'ExtraData' })
  @Type(() => NameValueRecord)
  public extraData?: NameValueRecord[];

  @Expose({ name: 'ProviderId' })
  public providerId?: number;
}

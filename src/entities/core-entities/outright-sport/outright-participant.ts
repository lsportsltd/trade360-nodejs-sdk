import { Expose, Type } from 'class-transformer';

import { ActiveParticipant } from '@lsports/enums';
import { NameValueRecord } from '@lsports/entities/common';

export class OutrightParticipant {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Position' })
  position?: string;

  @Expose({ name: 'IsActive' })
  isActive?: ActiveParticipant;

  @Expose({ name: 'ExtraData' })
  @Type(() => NameValueRecord)
  extraData?: NameValueRecord[];
}

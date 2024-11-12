import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { KeepAlive } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(31)
export class KeepAliveUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'KeepAlive' })
  @Type(() => KeepAlive)
  public keepAlive?: KeepAlive;
}

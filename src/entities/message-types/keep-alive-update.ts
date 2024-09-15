import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { KeepAlive } from '@lsports/entities';

@EntityKey(31)
export class KeepAliveUpdate {
  @Expose({ name: 'KeepAlive' })
  @Type(() => KeepAlive)
  public keepAlive?: KeepAlive;
}

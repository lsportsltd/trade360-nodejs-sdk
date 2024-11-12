import { EntityKey } from '@lsports/decorators';

import { BaseEntity } from './';

@EntityKey(32)
export class HeartbeatUpdate implements BaseEntity {
  [key: string]: unknown;
}

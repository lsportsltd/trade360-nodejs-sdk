import { Expose } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';

import { BaseEntity } from './';

@EntityKey(32)
export class HeartbeatUpdate implements BaseEntity {
  [key: string]: unknown;

  /**
   * Feed health signal. `undefined`/absent means no problem, non-zero indicates a
   * problem detected upstream. Signal only — does not trigger auto-suspend or recovery.
   */
  @Expose({ name: 'Problem' })
  public problem?: number;
}

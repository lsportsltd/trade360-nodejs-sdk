import { Expose } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';

import { BaseEntity } from './';

@EntityKey(32)
export class HeartbeatUpdate implements BaseEntity {
  [key: string]: unknown;

  /**
   * Feed interruption signal. `undefined`/absent means normal, non-zero indicates a
   * feed interruption detected upstream. Signal only — does not trigger auto-suspend or recovery.
   */
  @Expose({ name: 'FeedInterrupted' })
  public feedInterrupted?: number;
}

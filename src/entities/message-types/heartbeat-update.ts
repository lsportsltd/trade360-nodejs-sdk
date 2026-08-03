import { Expose } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';

import { BaseEntity } from './';

@EntityKey(32)
export class HeartbeatUpdate implements BaseEntity {
  [key: string]: unknown;

  /**
   * Feed interruption domains. Empty/absent = healthy. Phase 1: `[1]` = Markets.
   * Signal only — does not trigger auto-suspend or recovery.
   */
  @Expose({ name: 'FeedInterrupted' })
  public feedInterrupted?: number[];
}

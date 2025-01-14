import { Expose, Type } from 'class-transformer';
import { LivescoreEvent } from '@lsports/entities';
import { BaseEntity } from '@entities';
/**
 * GetLivescoreResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get livescore
 */
export class GetLivescoreResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Scores' })
  @Type(() => LivescoreEvent)
  scores: LivescoreEvent[] = [];
}

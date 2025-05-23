import { LivescoreEvent } from '../../../../entities/core-entities/livescore/livescore-event';
import { BaseEntity } from '@entities';
/**
 * GetLivescoreResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get livescore
 */
export class GetLivescoreResultElement extends LivescoreEvent implements BaseEntity {
  [key: string]: unknown;
}

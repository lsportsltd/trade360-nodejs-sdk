import { BaseEntity, LivescoreEvent } from '@lsports/entities';
/**
 * GetLivescoreResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get livescore
 */
export class GetLivescoreResultElement extends LivescoreEvent implements BaseEntity {
  [key: string]: unknown;
}

import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightScoreBodyStructure } from '@api/common/body-entities/responses/outright-score-body-structure';
/**
 * GetOutrightScoresResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright scores
 */
export class GetOutrightScoresResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Scores' })
  @Type(() => OutrightScoreBodyStructure)
  scores?: OutrightScoreBodyStructure[];
}

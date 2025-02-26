import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightScoreEventBodyStructure } from '@api/common/body-entities/responses/outright-score-event-body-structure';
/**
 * GetOutrightScoresResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright scores
 */
export class GetOutrightScoresResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Id' })
  @Type(() => Number)
  public id!: number;

  @Expose({ name: 'Name' })
  @Type(() => String)
  public name!: string;

  @Expose({ name: 'Type' })
  @Type(() => Number)
  public type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightScoreEventBodyStructure)
  events?: OutrightScoreEventBodyStructure[];
}

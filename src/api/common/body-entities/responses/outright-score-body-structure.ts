import { Expose, Type } from 'class-transformer';
import { OutrightScoreEventElement } from '@api/common/body-entities/responses/outright-score-event-element';
/**
 * OutrightScoreBodyStructure class is responsible
 * for deserializing the response from the snapshot
 * API to get outright score
 */
export class OutrightScoreBodyStructure {
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
  @Type(() => OutrightScoreEventElement)
  events?: OutrightScoreEventElement[];
}

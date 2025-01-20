import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightCompetitionsResultElement } from '@api/common/body-entities/responses/outright-competitions-result-element';

/**
 * GetOutrightLeaguesResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright legues fixture
 */
export class GetOutrightLeaguesResultElement implements BaseEntity {
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
  @Type(() => OutrightCompetitionsResultElement)
  events?: OutrightCompetitionsResultElement[];
}

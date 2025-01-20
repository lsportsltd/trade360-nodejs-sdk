import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightFixtureMarketsElement } from '@api/common/body-entities/responses/outright-fixture-market-element';

/**
 * GetOutrightFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright fixture markets
 */
export class GetOutrightFixtureMarketsResultElement implements BaseEntity {
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
  @Type(() => OutrightFixtureMarketsElement)
  events?: OutrightFixtureMarketsElement[];
}

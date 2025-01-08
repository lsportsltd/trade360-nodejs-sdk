import { Expose, Type } from 'class-transformer';
import { OutrightFixtureEventElement } from '@api/common/body-entities/responses/outright-fixture-event-element';

/**
 * GetOutrightFixtureResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright fixture
 */
export class GetOutrightFixtureResultElement  {

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
  @Type(() => OutrightFixtureEventElement)
  events?: OutrightFixtureEventElement[];
}

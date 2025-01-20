import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightEventElement } from '@api/common/body-entities/responses/outright-event-element';

/**
 * GetOutrightEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright events
 */
export class GetOutrightEventsResultElement implements BaseEntity {
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
  @Type(() => OutrightEventElement)
  events?: OutrightEventElement[];
}

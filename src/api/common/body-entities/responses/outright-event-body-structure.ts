import { Expose, Type } from 'class-transformer';
import { OutrightEventElement } from '@api/common/body-entities/responses/outright-event-element';
/**
 * OutrightEventBodyStructure class is responsible for
 * deserializing the response from the snapshot
 * API to a outright event.
 */
export class  OutrightEventBodyStructure {
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

import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightEventBodyStructure } from '@api/common/body-entities/responses/outright-event-body-structure';

/**
 * GetOutrightEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright events
 */
export class GetOutrightEventsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => OutrightEventBodyStructure)
  events?: OutrightEventBodyStructure[];
}

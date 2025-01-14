import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { EventBodyStructure } from '@api/common/body-entities/responses/event-body-structure';
/**
 * GetEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get events
 */
export class GetEventsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => EventBodyStructure)
  events?: EventBodyStructure[];
}

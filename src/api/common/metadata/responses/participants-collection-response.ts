import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { ParticipantBodyStructure } from '@api/common/body-entities/responses';

/**
 * ParticipantsCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of participants.
 */
export class ParticipantsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Data' })
  @Type(() => ParticipantBodyStructure)
  data?: ParticipantBodyStructure[];

  @Expose({ name: 'TotalItems' })
  totalItems?: number;
}

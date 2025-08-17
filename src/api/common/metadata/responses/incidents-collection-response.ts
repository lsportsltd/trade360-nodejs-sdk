import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@lsports/entities';
import { IncidentsBodyStructure } from '@api/common/body-entities/responses';

/**
 * IncidentsCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of incidents.
 */
export class IncidentsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Data' })
  @Type(() => IncidentsBodyStructure)
  data?: IncidentsBodyStructure[];

  @Expose({ name: 'TotalItems' })
  totalItems?: number;
}

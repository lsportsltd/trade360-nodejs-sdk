import { Expose, Type } from 'class-transformer';
import { IdNNameRecord } from '@lsports/entities/common';

/**
 * StateBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a state.
 */
export class StateBodyStructure {
  @Expose({ name: 'StateId' })
  public stateId?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Country' })
  @Type(() => IdNNameRecord)
  public country?: IdNNameRecord;
}

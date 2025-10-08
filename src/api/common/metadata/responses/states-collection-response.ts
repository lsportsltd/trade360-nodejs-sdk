import { Expose, Type } from 'class-transformer';
import { BaseCollectionResponse } from './base-collection-response';
import { StateBodyStructure } from '@api/common/body-entities/responses';

/**
 * StatesCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of states.
 */
export class StatesCollectionResponse extends BaseCollectionResponse<StateBodyStructure> {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose({ name: 'Data' })
  @Type(() => StateBodyStructure)
  data?: StateBodyStructure[];
}

import { Expose, Type } from 'class-transformer';

import { FixturesScheduleBodyStructure } from '@api/common/body-entities';
import { BaseEntity } from '@lsports/entities';

/**
 * Fixture Schedule Collection Response class
 * (used for serialization) - represents the response
 * body of the fixture schedule collection endpoint.
 * This class is used to deserialize the response from the
 * fixture schedule collection endpoint.
 * It contains an array of fixture schedule body structures.
 */
export class FixtureScheduleCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixtures' })
  @Type(() => FixturesScheduleBodyStructure)
  fixtures: FixturesScheduleBodyStructure[] = [];
}

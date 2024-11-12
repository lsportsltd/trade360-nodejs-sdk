import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { FixtureEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(1)
export class FixtureMetadataUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => FixtureEvent)
  public events!: FixtureEvent[];
}

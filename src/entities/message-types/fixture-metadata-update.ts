import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { FixtureEvent } from '@lsports/entities';

@EntityKey(1)
export class FixtureMetadataUpdate {
  @Expose({ name: 'Events' })
  @Type(() => FixtureEvent)
  public events!: FixtureEvent[];
}

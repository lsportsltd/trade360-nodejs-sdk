import { Expose, Type } from 'class-transformer';
import { FixtureEvent } from '@lsports/entities';
import { BaseEntity } from '@entities';
/**
 * GetFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get fixtures
 */
export class GetFixturesResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixtures' })
  @Type(() => FixtureEvent)
  fixtures: FixtureEvent[] = [];
}

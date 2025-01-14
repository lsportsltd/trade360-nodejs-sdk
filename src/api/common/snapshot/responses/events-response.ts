import { Expose, Type } from 'class-transformer';
import { Fixture, Livescore, Market } from '@lsports/entities';
import { BaseEntity } from '@entities';
/**
 * GetEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get events
 */
export class GetEventsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixture' })
  @Type(() => Fixture)
  fixture!: Fixture;

  @Expose({ name: 'Livescore' })
  @Type(() => Livescore)
  livescore!: Livescore;

  @Expose({ name: 'Markets' })
  @Type(() => Market)
  markets?: Market[];

  @Expose({ name: 'FixtureId' })
  @Type(() => Number)
  public fixtureId!: number;
}

import { Expose, Type } from 'class-transformer';
import { Fixture } from '@lsports/entities';
import { Livescore } from '@lsports/entities';
import { Market } from '@lsports/entities';
/**
 * GetEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get events
 */
export class GetEventsResultElement  {
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

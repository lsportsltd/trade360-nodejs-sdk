import { Expose, Type } from 'class-transformer';
import { Fixture, Livescore, Market } from '@lsports/entities';
/**
 * EventBodyStructure class is responsible for
 * deserializing the response from the snapshot
 * API to a event.
 */
export class  EventBodyStructure {
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

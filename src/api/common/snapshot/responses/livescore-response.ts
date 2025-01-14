import { Expose, Type } from 'class-transformer';
import { Livescore } from '@lsports/entities';
import { BaseEntity } from '@entities';
/**
 * GetLivescoreResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get livescore
 */
export class GetLivescoreResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Livescore' })
  @Type(() => Livescore)
  livescore!: Livescore;

  @Expose({ name: 'FixtureId' })
  @Type(() => Number)
  public fixtureId!: number;
}

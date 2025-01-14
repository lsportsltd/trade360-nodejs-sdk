import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightLeagueBodyStructure } from '@api/common/body-entities/responses/outright-league-body-structure';

/**
 * GetOutrightLeaguesResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright legues fixture
 */
export class GetOutrightLeaguesResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Leagues' })
  @Type(() => OutrightLeagueBodyStructure)
  leagues?: OutrightLeagueBodyStructure[];
}

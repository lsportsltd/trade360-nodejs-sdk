import { Expose, Type } from 'class-transformer';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

// type Constructor<T extends BaseEntity = BaseEntity> = new (...args: unknown[]) => T;

/**
 * GetTranslationsRequestDto class for sending request to get translations
 * from the API. It contains the properties for the request to get translations
 * from the API.
 * @param sportIds The sport IDs to filter the translations by in the
 * request to get translations from the API. The sport IDs are used to
 * @param locationIds The location IDs to filter the translations by in
 * the request to get translations from the API.
 * @param leagueIds The league IDs to filter the translations by in the
 * request to get translations from the API.
 * @param marketIds The market IDs to filter the translations by in the
 * request to get translations from the API.
 * @param participantIds The participant IDs to filter the translations by in
 * the request to get translations from the API.
 * @param languages The language IDs to filter the translations by in the
 * request to get translations from the API.
 * @returns GetTranslationsRequestDto instance that contains the properties
 * for the request to get translations from the API.
 */
export class GetTranslationsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: GetTranslationsRequestDto) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  @Type(() => Number)
  sportIds?: number[] = [];

  @Expose({ name: 'LocationIds' })
  @Type(() => Number)
  locationIds?: number[] = [];

  @Expose({ name: 'LeagueIds' })
  @Type(() => Number)
  leagueIds?: number[] = [];

  @Expose({ name: 'MarketIds' })
  @Type(() => Number)
  marketIds?: number[] = [];

  @Expose({ name: 'ParticipantIds' })
  @Type(() => Number)
  participantIds?: number[] = [];

  @Expose({ name: 'Languages' })
  @Type(() => Number)
  languages?: number[];
}

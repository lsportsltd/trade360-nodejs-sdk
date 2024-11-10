import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';
import { MarketType } from '@lsports/entities';

/**
 * Base interface for all entities that can be mapped
 */
// interface BaseEntity {
//   [key: string]: unknown;
// }

// type Constructor<T extends BaseEntity = BaseEntity> = new (...args: unknown[]) => T;

/**
 * GetMarketsRequestDto class for sending request to get markets
 * from the API. It extends the BaseEntity class and contains
 * the properties for the request to get markets from the API.
 * @param sportIds The sport IDs to filter the markets by in the
 * request to get markets from the API. The sport IDs are used to
 * @param locationIds The location IDs to filter the markets by in
 * the request to get markets from the API.
 * @param leagueIds The league IDs to filter the markets by in the
 * request to get markets from the API.
 * @param marketIds The market IDs to filter the markets by in the
 * request to get markets from the API.
 * @param isSettleable The flag to filter the markets by in the
 * request to get markets from the API. The filter meaning is
 * whether settlements is supported for this market and will
 * be provided for this market by LSports.
 * @param marketType The market type to filter the markets by in
 * the request to get markets from the API. Empty field returns
 * all leagues regardless of the market type.
 * @param languageId The language ID to filter the markets by in
 * the request to get markets from the API.
 * @returns GetMarketsRequestDto instance that contains the properties
 * for the request to get markets from the API.
 */
export class GetMarketsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  @Type(() => Array)
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  @Type(() => Array)
  locationIds?: number[];

  @Expose({ name: 'LeagueIds' })
  @Type(() => Array)
  leagueIds?: number[];

  @Expose({ name: 'MarketIds' })
  @Type(() => Array)
  marketIds?: number[];

  @Expose({ name: 'IsSettleable' })
  isSettleable?: boolean;

  @Expose({ name: 'MarketType' })
  marketType?: MarketType;

  @Expose({ name: 'LanguageId' })
  languageId?: number;
}

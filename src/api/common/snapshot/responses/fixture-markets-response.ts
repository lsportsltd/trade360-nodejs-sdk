import { MarketEvent } from '../../../../entities/core-entities/market/market-event';
import { BaseEntity } from '@entities';
/**
 * GetFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get get fixture markets
 */
export class GetFixtureMarketsResultElement extends MarketEvent implements BaseEntity {
  [key: string]: unknown;
}

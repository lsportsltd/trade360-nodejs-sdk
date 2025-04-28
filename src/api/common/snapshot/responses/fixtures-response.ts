import { FixtureEvent } from '../../../../entities/core-entities/fixture/fixture-event';
import { BaseEntity } from '@entities';
/**
 * GetFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get fixtures
 */
export class GetFixturesResultElement extends FixtureEvent implements BaseEntity {
  [key: string]: unknown;
}

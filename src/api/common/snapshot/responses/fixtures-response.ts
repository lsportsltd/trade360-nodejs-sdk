import { BaseEntity, FixtureEvent } from '@lsports/entities';
/**
 * GetFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get fixtures
 */
export class GetFixturesResultElement extends FixtureEvent implements BaseEntity {
  [key: string]: unknown;
}

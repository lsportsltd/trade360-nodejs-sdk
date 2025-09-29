import { Expose, Type } from 'class-transformer';

import { SportsBodyStructure } from './sports-body-structure';
import { LocationsBodyStructure } from './locations-body-structure';
import { NameValueRecord, Subscription } from '@lsports/entities/common';

/**
 * Outright League Fixture Snapshot class is responsible for
 * deserializing the response from the snapshot API to a
 * outright league fixture structure.
 */
export class OutrightLeagueFixtureSnapshot {
  @Expose({ name: 'Subscription' })
  @Type(() => Subscription)
  subscription!: Subscription;

  @Expose({ name: 'Sport' })
  @Type(() => SportsBodyStructure)
  sport!: SportsBodyStructure;

  @Expose({ name: 'Location' })
  @Type(() => LocationsBodyStructure)
  location!: LocationsBodyStructure;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate!: Date;

  @Expose({ name: 'Status' })
  status!: number;

  @Expose({ name: 'ExtraData' })
  @Type(() => NameValueRecord)
  public extraData?: NameValueRecord[];

  @Expose({ name: 'EndDate' })
  @Type(() => Date)
  endDate?: Date;
}

import { Expose, Type } from 'class-transformer';

import { FixtureStatus } from '@lsports/enums';
import { IdNNameRecord, NameValueRecord, Subscription } from '@lsports/entities/common';

import { League } from './league';
import { Location } from './location';
import { Participant } from './participant';
import { Sport } from './sport';
import { FixtureVenue } from './fixture-venue';

export class Fixture {
  @Expose({ name: 'Subscription' })
  @Type(() => Subscription)
  public subscription?: Subscription;

  @Expose({ name: 'Sport' })
  @Type(() => Sport)
  public sport?: Sport;

  @Expose({ name: 'Location' })
  @Type(() => Location)
  public location?: Location;

  @Expose({ name: 'League' })
  @Type(() => League)
  public league?: League;

  @Expose({ name: 'StartDate' })
  @Type(() => Date)
  public startDate?: Date;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  public lastUpdate?: Date;

  @Expose({ name: 'Status' })
  public status?: FixtureStatus;

  @Expose({ name: 'Participants' })
  @Type(() => Participant)
  public participants?: Participant[];

  @Expose({ name: 'FixtureExtraData' })
  @Type(() => NameValueRecord)
  public fixtureExtraData?: NameValueRecord[];

  @Expose({ name: 'Venue' })
  @Type(() => FixtureVenue)
  public venue?: FixtureVenue;

  @Expose({ name: 'Stage' })
  @Type(() => IdNNameRecord)
  public stage?: IdNNameRecord;

  @Expose({ name: 'Round' })
  @Type(() => IdNNameRecord)
  public round?: IdNNameRecord;
  
  @Expose({ name: 'ExternalFixtureId' })
  public externalFixtureId?: string | null;
}

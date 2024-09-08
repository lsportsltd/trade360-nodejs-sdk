import { Expose, Type } from "class-transformer";

import { FixtureStatus } from "@lsports/enums";
import { NameValueRecord, Subscription } from "@lsports/entities/common";

import { League } from "./league";
import { Location } from "./location";
import { Participant } from "./participant";
import { Sport } from "./sport";

export class Fixture {
  @Expose({ name: "Subscription" })
  @Type(() => Subscription)
  public subscription?: Subscription;

  @Expose({ name: "Sport" })
  @Type(() => Sport)
  public sport?: Sport;

  @Expose({ name: "Location" })
  @Type(() => Location)
  public location?: Location;

  @Expose({ name: "League" })
  @Type(() => League)
  public league?: League;

  @Expose({ name: "StartDate" })
  @Type(() => Date)
  public startDate?: string;

  @Expose({ name: "LastUpdate" })
  @Type(() => Date)
  public lastUpdate?: string;

  @Expose({ name: "Status" })
  // @Type(() => FixtureStatus)
  // TODO: validate type is one of FixtureStatus
  public status?: FixtureStatus;

  @Expose({ name: "Participants" })
  @Type(() => Participant)
  public participants?: Participant[];

  @Expose({ name: "FixtureExtraData" })
  @Type(() => NameValueRecord)
  public fixtureExtraData?: NameValueRecord[];
}

import { Expose, Type } from "class-transformer";

import { FixtureStatus } from "../../enums";
import { NameValueRecord, Subscription } from "../common";
import { League } from "./league";
import { Location } from "./location";
import { Participant } from "./participant";
import { Sport } from "./sport";

export class Fixture {
  @Expose({ name: "subscription" })
  @Type(() => Subscription)
  public Subscription?: Subscription;

  @Expose({ name: "sport" })
  @Type(() => Sport)
  public Sport?: Sport;

  @Expose({ name: "location" })
  @Type(() => Location)
  public Location?: Location;

  @Expose({ name: "league" })
  @Type(() => League)
  public League?: League;

  @Expose({ name: "startDate" })
  @Type(() => Date)
  public StartDate?: string;

  @Expose({ name: "lastUpdate" })
  @Type(() => Date)
  public LastUpdate?: string;

  @Expose({ name: "status" })
  // @Type(() => FixtureStatus)
  // TODO: validate type is one of FixtureStatus
  public Status?: FixtureStatus;

  @Expose({ name: "participants" })
  @Type(() => Participant)
  public Participants?: Participant[];

  @Expose({ name: "fixtureExtraData" })
  @Type(() => NameValueRecord)
  public FixtureExtraData?: NameValueRecord[];
}

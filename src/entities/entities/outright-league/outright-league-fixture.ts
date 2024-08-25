import { Expose, Type } from "class-transformer";

import { FixtureStatus } from "../../enums";
import { NameValueRecord, Subscription } from "../common";
import { Location, Sport } from "../fixture";

export class OutrightLeagueFixture {
  @Expose({ name: "Subscription" })
  @Type(() => Subscription)
  subscription?: Subscription;

  @Expose({ name: "Sport" })
  @Type(() => Sport)
  sport?: Sport;

  @Expose({ name: "Location" })
  @Type(() => Location)
  location?: Location;

  @Expose({ name: "LastUpdate" })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: "Status" })
  status?: FixtureStatus;

  @Expose({ name: "ExtraData" })
  @Type(() => NameValueRecord)
  extraData?: NameValueRecord[];
}

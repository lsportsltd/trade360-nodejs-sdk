import { Expose, Type } from "class-transformer";

import { Location, Sport } from "@lsports/entities";
import { FixtureStatus } from "@lsports/enums";
import { NameValueRecord, Subscription } from "@lsports/entities/common";

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

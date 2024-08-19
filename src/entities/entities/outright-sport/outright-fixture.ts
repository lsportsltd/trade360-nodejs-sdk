import { Expose, Type } from "class-transformer";

import { NameValueRecord, Subscription } from "../common";
import {Sport, Location } from "../fixture";
import { OutrightParticipant } from "./outright-participant";

export class OutrightFixture {
  @Expose({ name: "Subscription" })
  @Type(() => Subscription)
  subscription?: Subscription;

  @Expose({ name: "Sport" })
  @Type(() => Sport)
  sport?: Sport;

  @Expose({ name: "Location" })
  @Type(() => Location)
  location?: Location;

  @Expose({ name: "StartDate" })
  @Type(() => Date)
  startDate?: Date;

  @Expose({ name: "LastUpdate" })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: "Status" })
  status?: number;

  @Expose({ name: "Participants" })
  @Type(() => OutrightParticipant)
  participants?: OutrightParticipant[];

  @Expose({ name: "ExtraData" })
  @Type(() => NameValueRecord)
  extraData?: NameValueRecord[];
}

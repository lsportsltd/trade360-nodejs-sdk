import { Expose, Type } from "class-transformer";

import { NameValueRecord } from "@lsports/entities/common";

import { Period } from "./period";
import { Scoreboard } from "./scoreboard";
import { Statistic } from "./statistic";

export class Livescore {
  @Expose({ name: "Scoreboard" })
  @Type(() => Scoreboard)
  scoreboard?: Scoreboard;

  @Expose({ name: "Periods" })
  @Type(() => Period)
  periods?: Period[];

  @Expose({ name: "Statistics" })
  @Type(() => Statistic)
  statistics?: Statistic[];

  @Expose({ name: "LivescoreExtraData" })
  @Type(() => NameValueRecord)
  livescoreExtraData?: NameValueRecord[];
}

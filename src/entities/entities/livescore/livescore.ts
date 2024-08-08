import { Expose, Type } from "class-transformer";

import { Scoreboard } from "./scoreboard";
import { Period } from "./period";
import { Statistic } from "./statistic";
import { NameValueRecord } from "../common";

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

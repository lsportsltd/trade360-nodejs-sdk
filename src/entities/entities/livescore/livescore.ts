import { Expose, Type } from "class-transformer";

import { Scoreboard } from "./scoreboard";
import { Period } from "./period";
import { Statistic } from "./Statistic";
import { NameValueRecord } from "../common";

export class Livescore {
  @Expose({ name: "scoreboard" })
  @Type(() => Scoreboard)
  Scoreboard?: Scoreboard;

  @Expose({ name: "periods" })
  @Type(() => Period)
  Periods?: Period[];

  @Expose({ name: "statistics" })
  @Type(() => Statistic)
  Statistics?: Statistic[];

  @Expose({ name: "livescoreExtraData" })
  @Type(() => NameValueRecord)
  LivescoreExtraData?: NameValueRecord[];
}

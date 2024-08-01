import { Expose, Type } from "class-transformer";

import { Result } from "./result";
import { StatisticType } from "../../enums/statistic-type";
import { Incident } from "./incident";

export class Statistic {
  @Expose({ name: "type" })
  Type?: StatisticType;

  @Expose({ name: "results" })
  @Type(() => Result)
  Results?: Result[];

  @Expose({ name: "incidents" })
  @Type(() => Incident)
  Incidents?: Incident[];
}

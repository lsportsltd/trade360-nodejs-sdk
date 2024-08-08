import { Expose, Type } from "class-transformer";

import { Result } from "./result";
import { StatisticType } from "../../enums/statistic-type";
import { Incident } from "./incident";

export class Statistic {
  @Expose({ name: "Type" })
  type?: StatisticType;

  @Expose({ name: "Results" })
  @Type(() => Result)
  results?: Result[];

  @Expose({ name: "Incidents" })
  @Type(() => Incident)
  incidents?: Incident[];
}

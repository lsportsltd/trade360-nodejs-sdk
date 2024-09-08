import { Expose, Type } from "class-transformer";

import { FixtureStatus, StatusDescription } from "@lsports/enums";

import { Result } from "./result";

export class Scoreboard {
  @Expose({ name: "Status" })
  status?: FixtureStatus;

  @Expose({ name: "Description" })
  description?: StatusDescription;

  @Expose({ name: "CurrentPeriod" })
  currentPeriod?: number;

  @Expose({ name: "Time" })
  time?: string;

  @Expose({ name: "Results" })
  @Type(() => Result)
  results?: Result[];
}

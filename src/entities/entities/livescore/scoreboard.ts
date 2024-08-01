import { Expose, Type } from "class-transformer";

import { FixtureStatus } from "../../enums";
import { StatusDescription } from "../../enums/status-description";
import { Result } from "./result";

export class Scoreboard {
  @Expose({ name: "status" })
  Status?: FixtureStatus;

  @Expose({ name: "description" })
  Description?: StatusDescription;

  @Expose({ name: "currentPeriod" })
  CurrentPeriod?: number;

  @Expose({ name: "time" })
  Time?: string;

  @Expose({ name: "results" })
  @Type(() => Result)
  Results?: Result[];
}

import { Expose, Type } from "class-transformer";

import { Result } from "./result";
import { Incident } from "./incident";

export class Period {
  @Expose({ name: "type" })
  Type?: number;

  @Expose({ name: "isFinished" })
  IsFinished?: boolean;

  @Expose({ name: "isConfirmed" })
  IsConfirmed?: boolean;

  @Expose({ name: "results" })
  @Type(() => Result)
  Results?: Result[];

  @Expose({ name: "incidents" })
  @Type(() => Incident)
  Incidents?: Incident[];

  @Expose({ name: "subPeriods" })
  @Type(() => Period)
  SubPeriods?: Period[];

  @Expose({ name: "sequenceNumber" })
  SequenceNumber?: number;
}

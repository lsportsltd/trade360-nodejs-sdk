import { Expose, Type } from "class-transformer";

import { OutrightFixtureEvent } from "./outright-fixture-event";

export class OutrightFixtureCompetition {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Type" })
  type?: number;

  @Expose({ name: "Events" })
  @Type(() => OutrightFixtureEvent)
  events?: OutrightFixtureEvent[];
}

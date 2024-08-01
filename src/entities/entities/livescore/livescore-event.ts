import { Expose, Type } from "class-transformer";

import { Fixture } from "../fixture";
import { Livescore } from "./livescore";

export class LivescoreEvent {
  @Expose({ name: "fixtureId" })
  FixtureId?: number;

  @Expose({ name: "fixture" })
  @Type(() => Fixture)
  Fixture?: Fixture;

  @Expose({ name: "livescore" })
  @Type(() => Livescore)
  Livescore?: Livescore;
}

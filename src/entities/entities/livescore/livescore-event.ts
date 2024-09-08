import { Expose, Type } from "class-transformer";

import { Fixture } from "@lsports/entities";

import { Livescore } from "./livescore";

export class LivescoreEvent {
  @Expose({ name: "FixtureId" })
  fixtureId?: number;

  @Expose({ name: "Fixture" })
  @Type(() => Fixture)
  fixture?: Fixture;

  @Expose({ name: "Livescore" })
  @Type(() => Livescore)
  livescore?: Livescore;
}

import { Expose, Type } from "class-transformer";

import { Fixture } from "./fixture";

export class FixtureEvent {
  @Expose({ name: "FixtureId" })
  @Type(() => Number)
  public fixtureId!: number;

  @Expose({ name: "Fixture" })
  @Type(() => Fixture)
  public fixture!: Fixture;
}

import { Fixture } from "./fixture";
import { Expose, Type } from "class-transformer";

export class FixtureEvent {
  @Expose({ name: "fixtureId" })
  @Type(() => Number)
  public FixtureId!: number;

  @Expose({ name: "fixture" })
  @Type(() => Fixture)
  public Fixture!: Fixture;
}
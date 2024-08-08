import { Fixture } from "./fixture";
import { Expose, Type } from "class-transformer";

export class FixtureEvent {
  @Expose({ name: "FixtureId" })
  @Type(() => Number)
  public fixtureId!: number;

  @Expose({ name: "Fixture" })
  @Type(() => Fixture)
  public fixture!: Fixture;
}

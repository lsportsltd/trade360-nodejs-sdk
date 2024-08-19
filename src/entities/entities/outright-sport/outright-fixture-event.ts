import { Expose, Type } from "class-transformer";
import { OutrightFixture } from "./outright-fixture";

export class OutrightFixtureEvent {
  @Expose({ name: "FixtureId" })
  fixtureId?: number;

  @Expose({ name: "OutrightFixture" })
  @Type(() => OutrightFixture)
  outrightFixture?: OutrightFixture;
}

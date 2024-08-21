import { Expose, Type } from "class-transformer";

import { OutrightFixture } from "./outright-fixture";
import { BaseEvent } from "./base-event";

export class OutrightFixtureEvent extends BaseEvent {
  // @Expose({ name: "FixtureId" })
  // fixtureId?: number;

  @Expose({ name: "OutrightFixture" })
  @Type(() => OutrightFixture)
  outrightFixture?: OutrightFixture;
}

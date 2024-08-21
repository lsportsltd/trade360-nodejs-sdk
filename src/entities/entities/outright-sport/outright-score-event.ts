import { Expose, Type } from "class-transformer";

import { OutrightScore } from "./outright-score";
import { BaseEvent } from "./base-event";

export class OutrightScoreEvent extends BaseEvent {
  // @Expose({ name: "FixtureId" })
  // fixtureId?: number;

  @Expose({ name: "OutrightScore" })
  @Type(() => OutrightScore)
  outrightScore?: OutrightScore;
}

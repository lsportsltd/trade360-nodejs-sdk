import { Expose, Type } from "class-transformer";

import { OutrightScore } from "./outright-score";

export class OutrightScoreEvent {
  @Expose({ name: "FixtureId" })
  fixtureId!: number;

  @Expose({ name: "OutrightScore" })
  @Type(() => OutrightScore)
  outrightScore?: OutrightScore;
}

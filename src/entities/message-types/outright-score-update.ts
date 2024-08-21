import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { OutrightCompetition, OutrightScoreEvent } from "../entities";

@EntityKey(39)
export class OutrightScoreUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightScoreEvent>;
}

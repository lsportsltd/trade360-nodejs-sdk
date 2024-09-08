import { Expose, Type } from "class-transformer";

import { EntityKey } from "@lsports/decorators";
import { OutrightCompetition, OutrightFixtureEvent } from "@lsports/entities";

@EntityKey(37)
export class OutrightFixtureUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightFixtureEvent>;
}

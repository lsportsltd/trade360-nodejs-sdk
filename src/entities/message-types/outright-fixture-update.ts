import { Expose, Type } from "class-transformer";
import { EntityKey } from "../decorators";
import { OutrightCompetition, OutrightFixtureEvent } from "../entities";

@EntityKey(37)
export class OutrightFixtureUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightFixtureEvent>;
}

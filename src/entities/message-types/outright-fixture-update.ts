import { Expose, Type } from "class-transformer";
import { EntityKey } from "../decorators";
import { OutrightFixtureCompetition } from "../entities";

@EntityKey(37)
export class OutrightFixtureUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightFixtureCompetition)
  competition?: OutrightFixtureCompetition;
}

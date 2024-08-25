import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import {
  OutrightLeagueCompetition,
  OutrightLeagueFixtureEvent,
} from "../entities";

@EntityKey(38)
export class OutrightLeagueFixtureUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<OutrightLeagueFixtureEvent>;
}

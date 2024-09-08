import { Expose, Type } from "class-transformer";

import { EntityKey } from "@lsports/decorators";
import {
  OutrightLeagueCompetition,
  OutrightLeagueFixtureEvent,
} from "@lsports/entities";

@EntityKey(38)
export class OutrightLeagueFixtureUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<OutrightLeagueFixtureEvent>;
}

import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { MarketEvent, OutrightLeagueCompetition } from "../entities";

@EntityKey(40)
export class OutrightLeagueMarketUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<MarketEvent>;
}

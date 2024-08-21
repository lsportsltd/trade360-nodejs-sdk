import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { MarketEvent, OutrightCompetition } from "../entities";

@EntityKey(41)
export class OutrightFixtureMarketUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}

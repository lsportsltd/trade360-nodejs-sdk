import { Expose, Type } from "class-transformer";

import { EntityKey } from "@lsports/decorators";
import { MarketEvent, OutrightCompetition } from "@lsports/entities";

@EntityKey(41)
export class OutrightFixtureMarketUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}

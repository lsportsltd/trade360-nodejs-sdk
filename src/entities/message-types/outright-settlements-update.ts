import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { MarketEvent, OutrightCompetition } from "../entities";

@EntityKey(42)
export class OutrightSettlementsUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}

import { Expose, Type } from "class-transformer";

import { EntityKey } from "@lsports/decorators";
import { MarketEvent } from "@lsports/entities";

@EntityKey(35)
export class SettlementUpdate {
  @Expose({ name: "Events" })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}

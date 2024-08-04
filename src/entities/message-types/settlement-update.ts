import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { MarketEvent } from "../entities";

@EntityKey(35)
export class SettlementUpdate {
//   @Expose({ name: "events" })
//   @Type(() => MarketEvent)
  Events?: MarketEvent[];
}
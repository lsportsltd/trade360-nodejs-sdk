import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { MarketEvent } from "../entities";

@EntityKey(3)
export class MarketUpdate {
  @Expose({ name: "Events" })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}

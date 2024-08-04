import { Expose, Type } from "class-transformer";

import { Market } from "./market";

export class MarketEvent {
  @Expose({ name: "fixtureId" })
  FixtureId?: number;

  @Expose({ name: "markets" })
  @Type(() => Market)
  Markets?: Market[];
}

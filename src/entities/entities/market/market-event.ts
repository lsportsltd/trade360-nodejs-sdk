import { Expose, Type } from "class-transformer";

import { Market } from "./market";

export class MarketEvent {
  @Expose({ name: "FixtureId" })
  fixtureId!: number;

  @Expose({ name: "Markets" })
  @Type(() => Market)
  markets?: Market[];
}

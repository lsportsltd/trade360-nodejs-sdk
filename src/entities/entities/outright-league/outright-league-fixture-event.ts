import { Expose, Type } from "class-transformer";

import { OutrightLeagueFixture } from "./outright-league-fixture";

export class OutrightLeagueFixtureEvent {
  @Expose({ name: "FixtureId" })
  fixtureId!: number;

  @Expose({ name: "OutrightLeague" })
  @Type(() => OutrightLeagueFixture)
  outrightLeague?: OutrightLeagueFixture;
}

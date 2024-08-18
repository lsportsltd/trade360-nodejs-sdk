import { Expose, Type } from "class-transformer";
import { EntityKey } from "../decorators";
import { OutrightFixtureMarketCompetition } from "../entities";

@EntityKey(41)
export class OutrightFixtureMarketUpdate {
    @Expose({ name: 'Competition' })
    @Type(() => OutrightFixtureMarketCompetition)
    competition?: OutrightFixtureMarketCompetition;
  }
import { Expose, Type } from "class-transformer";
// 
import {
  // OutrightCompetition,
  // OutrightScoreEvent,
  OutrightScoreCompetition,
} from "../entities";
import { EntityKey } from "../decorators";

@EntityKey(39)
export class OutrightScoreUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightScoreCompetition)
  // competition?: OutrightCompetition<OutrightLiveScoreEvent>;
  competition?: OutrightScoreCompetition;
}

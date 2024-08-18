import { Expose, Type } from "class-transformer";
import { EntityKey } from "../decorators";
import { OutrightSettlementsCompetition } from "../entities";

@EntityKey(42)
export class OutrightSettlementsUpdate {
  @Expose({ name: "Competition" })
  @Type(() => OutrightSettlementsCompetition)
  competition?: OutrightSettlementsCompetition;
}

import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { LivescoreEvent } from "../entities";

@EntityKey(2)
export class LivescoreUpdate {
  // @Expose({ name: "events" })
  // @Type(() => LivescoreEvent)
  Events?: LivescoreEvent[];
}

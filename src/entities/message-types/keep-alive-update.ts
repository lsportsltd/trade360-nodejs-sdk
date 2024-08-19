import { Expose, Type } from "class-transformer";

import { EntityKey } from "../decorators";
import { KeepAlive } from "../entities";

@EntityKey(31)
export class KeepAliveUpdate {
  @Expose({ name: "KeepAlive" })
  @Type(() => KeepAlive)
  public keepAlive?: KeepAlive;
}

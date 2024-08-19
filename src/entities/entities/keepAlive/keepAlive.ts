import { Expose, Type } from "class-transformer";

import { EntityKey } from "../../decorators";
import { NameValueRecord } from "../common";

@EntityKey(31)
export class KeepAlive {
  @Expose({ name: "ActiveEvents" })
  public activeEvents?: number[];

  @Expose({ name: "ExtraData" })
  @Type(() => NameValueRecord)
  public extraData?: NameValueRecord[];

  @Expose({ name: "ProviderId" })
  public providerId?: number;
}

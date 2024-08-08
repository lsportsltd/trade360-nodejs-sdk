import { Expose, Type } from "class-transformer";

import { Bet } from "./bet";

export class Market {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Bets" })
  @Type(() => Bet)
  bets?: Bet[];

  @Expose({ name: "MainLine" })
  mainLine?: string;
}

import { Expose, Type } from "class-transformer";

import { Bet } from "./bet";

export class Market {
  @Expose({ name: "id" })
  Id?: number;

  @Expose({ name: "name" })
  Name?: string;

  @Expose({ name: "bets" })
  @Type(() => Bet)
  Bets?: Bet[];

  @Expose({ name: "mainLine" })
  MainLine?: string;
}

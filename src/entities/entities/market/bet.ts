import { Expose, Type } from "class-transformer";

import { BetStatus, SettlementType } from "../../enums";

export class Bet {
  @Expose({ name: "id" })
  Id?: number;

  @Expose({ name: "name" })
  Name?: string;

  @Expose({ name: "line" })
  Line?: string;

  @Expose({ name: "baseLine" })
  BaseLine?: string;

  @Expose({ name: "status" })
  Status?: BetStatus;

  @Expose({ name: "startPrice" })
  StartPrice?: string;

  @Expose({ name: "price" })
  Price?: string;

  @Expose({ name: "priceVolume" })
  PriceVolume?: string;

  @Expose({ name: "settlement" })
  Settlement?: SettlementType;

  @Expose({ name: "providerBetId" })
  ProviderBetId?: string;

  @Expose({ name: "lastUpdate" })
  @Type(() => Date)
  LastUpdate?: Date;

  @Expose({ name: "priceIN" })
  PriceIN?: string;

  @Expose({ name: "priceUS" })
  PriceUS?: string;

  @Expose({ name: "priceUK" })
  PriceUK?: string;

  @Expose({ name: "priceMA" })
  PriceMA?: string;

  @Expose({ name: "priceHK" })
  PriceHK?: string;

  @Expose({ name: "isChanged" })
  IsChanged: number = -1;

  @Expose({ name: "probability" })
  Probability?: number;

  @Expose({ name: "participantId" })
  ParticipantId?: number;

  @Expose({ name: "playerName" })
  PlayerName?: string;
}

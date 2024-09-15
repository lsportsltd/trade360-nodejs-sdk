import { Expose, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';

export class Bet {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Line' })
  line?: string;

  @Expose({ name: 'BaseLine' })
  baseLine?: string;

  @Expose({ name: 'Status' })
  status?: BetStatus;

  @Expose({ name: 'StartPrice' })
  startPrice?: string;

  @Expose({ name: 'Price' })
  price?: string;

  @Expose({ name: 'PriceVolume' })
  priceVolume?: string;

  @Expose({ name: 'Settlement' })
  settlement?: SettlementType;

  @Expose({ name: 'ProviderBetId' })
  providerBetId?: string;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: 'PriceIN' })
  priceIN?: string;

  @Expose({ name: 'PriceUS' })
  priceUS?: string;

  @Expose({ name: 'PriceUK' })
  priceUK?: string;

  @Expose({ name: 'PriceMA' })
  priceMA?: string;

  @Expose({ name: 'PriceHK' })
  priceHK?: string;

  @Expose({ name: 'IsChanged' })
  isChanged: number = -1;

  @Expose({ name: 'Probability' })
  probability?: number;

  @Expose({ name: 'ParticipantId' })
  participantId?: number;

  @Expose({ name: 'PlayerName' })
  playerName?: string;
}

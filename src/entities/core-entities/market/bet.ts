import { Expose } from 'class-transformer';

import { BaseBet } from './base-bet';

export class Bet extends BaseBet {
  @Expose({ name: 'ProviderBetId' })
  providerBetId?: string;
}

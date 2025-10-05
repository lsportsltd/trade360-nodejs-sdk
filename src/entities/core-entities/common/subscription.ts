import { Expose } from 'class-transformer';

import { SubscriptionStatus } from '@lsports/enums';

export class Subscription {
  @Expose({ name: 'Type' })
  public type!: number;

  @Expose({ name: 'Status' })
  public status!: keyof typeof SubscriptionStatus;
}

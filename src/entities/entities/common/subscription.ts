import { Expose } from "class-transformer";

import { SubscriptionStatus, SubscriptionType } from "../../enums";

export class Subscription {
  @Expose({ name: "Type" })
  public type!: SubscriptionType;

  @Expose({ name: "Status" })
  public status!: keyof typeof SubscriptionStatus;
}

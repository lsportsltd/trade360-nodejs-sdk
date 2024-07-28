import { Expose, Type } from "class-transformer";
import { SubscriptionStatus, SubscriptionType } from "../../enums";

export class Subscription {
  @Expose({ name: "type" })
  // @Transform(type => indexOf(Object.keys(SubscriptionType)[type]) > -1 ?? type)
  // TODO: validate type is one of SubscriptionType
    public Type!: SubscriptionType;
  
  @Expose({ name: "status" })
  // @Type(() => SubscriptionStatus)
  // TODO: validate type is one of SubscriptionStatus
  public Status!: keyof typeof SubscriptionStatus;
}

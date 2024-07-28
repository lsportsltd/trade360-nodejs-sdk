import { Expose, Type } from "class-transformer";

import { MessageHeader } from "./messageHeader";

export class WrappedMessage {
  @Expose({ name: 'header' })
  @Type(() => MessageHeader)
  public Header!: MessageHeader;

  @Expose({ name: 'body' })
  public Body?: string;
}

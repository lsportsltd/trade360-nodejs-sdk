import { Expose, Type } from "class-transformer";
import 'reflect-metadata';

import { MessageHeader } from "./messageHeader";

export class WrappedMessage {
  // @Expose({ name: 'header' })
  @Expose()
  @Type(() => MessageHeader)
  public Header!: MessageHeader;

  // @Expose({ name: 'body' })
  @Expose()
  public Body?: string;
}



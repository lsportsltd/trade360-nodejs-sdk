import { Expose, Transform, Type } from 'class-transformer';
import 'reflect-metadata';

import { MessageHeader } from './message-header';

export class WrappedMessage {
  @Expose({ name: 'Header' })
  @Type(() => MessageHeader)
  public header!: MessageHeader;

  @Expose({ name: 'Body' })
  @Transform(({ obj }) => JSON.stringify(obj.Body))
  public body?: string;
}

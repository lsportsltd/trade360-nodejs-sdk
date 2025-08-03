import { Expose, Type } from 'class-transformer';

import { MessageHeader } from './message-header';
import { BaseEntity } from '../message-types';
// import { BigIntSerializationUtil } from '../utilities';

export class WrappedMessage implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Header' })
  @Type(() => MessageHeader)
  public header!: MessageHeader;

  @Expose({ name: 'Body' })
  public body?: BaseEntity;
}

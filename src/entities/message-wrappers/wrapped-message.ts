import { Expose, Transform, Type } from 'class-transformer';

import { MessageHeader } from './message-header';
import { BaseEntity } from '../message-types';
import { JsonUtil } from '@utilities';

export class WrappedMessage implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Header' })
  @Type(() => MessageHeader)
  public header!: MessageHeader;

  @Expose({ name: 'Body' })
  @Transform(({ obj }) => JsonUtil.stringify(obj.Body))
  public body?: string;
}

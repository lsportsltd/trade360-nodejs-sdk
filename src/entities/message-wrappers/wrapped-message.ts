import { Expose, Transform, Type } from 'class-transformer';

import { MessageHeader } from './message-header';
import { BaseEntity } from '../message-types';
import { BigIntSerializationUtil } from '../utilities';

export class WrappedMessage implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Header' })
  @Type(() => MessageHeader)
  public header!: MessageHeader;

  @Expose({ name: 'Body' })
  @Transform(({ obj }) => {
    try {
      return BigIntSerializationUtil.stringify(obj.Body);
    } catch (error) {
      // Handle circular references and other transform errors
      return BigIntSerializationUtil.stringify({
        error: 'Body transformation failed',
        originalError: String(error),
      });
    }
  })
  public body?: string;
}

import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

export class MessageHeader {
  @Expose({ name: 'Type' })
  public type!: number;

  @Expose({ name: 'MsgSeq' })
  public msgSeq?: number;

  @Expose({ name: 'MsgGuid' })
  public msgGuid!: string;

  @Expose({ name: 'CreationDate' })
  @Type(() => Date)
  public creationDate?: Date;

  @Expose({ name: 'ServerTimestamp' })
  @Type(() => Date)
  public serverTimestamp!: number;

  public messageBrokerTimestamp!: number;
}

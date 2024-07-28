import { Expose, Type } from "class-transformer";
import "reflect-metadata";

export class MessageHeader {
  @Expose({ name: "type" })
  public Type!: number;

  @Expose({ name: "msgSeq" })
  public MsgSeq!: number;

  @Expose({ name: "msgGuid" })
  public MsgGuid!: string;

  @Expose({ name: "creationDate" })
  @Type(() => Date)
  public CreationDate!: Date;

  @Expose({ name: "serverTimestamp" })
  @Type(() => Date)
  public ServerTimestamp!: number;
}

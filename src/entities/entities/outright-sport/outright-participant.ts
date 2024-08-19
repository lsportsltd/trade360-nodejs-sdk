import { Expose, Type } from "class-transformer";
import { NameValueRecord } from "../common";
import { ActiveParticipant } from "../../enums";

export class OutrightParticipant {
    @Expose({ name: 'Id' })
    id?: number;
  
    @Expose({ name: 'Name' })
    name?: string;
  
    @Expose({ name: 'Position' })
    position?: string;
  
    @Expose({ name: 'IsActive' })
    isActive?: ActiveParticipant;
  
    @Expose({ name: 'ExtraData' })
    @Type(() => NameValueRecord)
    extraData?: NameValueRecord[];
  }
  
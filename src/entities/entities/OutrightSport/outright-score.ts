import { Expose, Type } from "class-transformer";

import { OutrightScoreStatus } from "../../enums";
import { ParticipantResult } from "./participant-result";

export class OutrightScore {
  @Expose({ name: "ParticipantResults" })
  @Type(() => ParticipantResult)
  participantResults?: ParticipantResult[];

  @Expose({ name: "Status" })
  status?: OutrightScoreStatus;
}

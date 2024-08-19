import { Expose } from "class-transformer";

export class ParticipantResult {
  @Expose({ name: "ParticipantId" })
  participantId?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Result" })
  result?: number;
}

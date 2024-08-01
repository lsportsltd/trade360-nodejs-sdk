import { Expose, Type } from "class-transformer";

import { Result } from "./result";

export class Incident {
  @Expose({ name: "period" })
  Period?: number;

  @Expose({ name: "incidentType" })
  IncidentType?: number;

  @Expose({ name: "seconds" })
  Seconds?: number;

  @Expose({ name: "participantPosition" })
  ParticipantPosition?: string;

  @Expose({ name: "playerId" })
  PlayerId?: string;

  @Expose({ name: "playerName" })
  PlayerName?: string;

  @Expose({ name: "results" })
  @Type(() => Result)
  Results?: Result[];
}

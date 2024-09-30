import { Expose, Type } from 'class-transformer';

import { Result } from './result';

export class Incident {
  @Expose({ name: 'Period' })
  period?: number;

  @Expose({ name: 'IncidentType' })
  incidentType?: number;

  @Expose({ name: 'Seconds' })
  seconds?: number;

  @Expose({ name: 'ParticipantPosition' })
  participantPosition?: string;

  @Expose({ name: 'PlayerId' })
  playerId?: string;

  @Expose({ name: 'PlayerName' })
  playerName?: string;

  @Expose({ name: 'Results' })
  @Type(() => Result)
  results?: Result[];
}

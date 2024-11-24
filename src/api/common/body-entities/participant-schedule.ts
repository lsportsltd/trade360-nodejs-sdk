import { Expose } from 'class-transformer';

/**
 * ParticipantSchedule class is responsible for
 * deserializing the response from the subscription
 * API to a participant schedule.
 */
export class ParticipantSchedule {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Position' })
  position!: number;

  @Expose({ name: 'Name' })
  name?: string;
}

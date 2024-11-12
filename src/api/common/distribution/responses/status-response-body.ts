import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

export class StatusResponseBody implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'IsDistributionOn' })
  isDistributionOn!: boolean;

  @Expose({ name: 'Consumers' })
  consumers!: string[];

  @Expose({ name: 'NumberMessagesInQueue' })
  numberMessagesInQueue!: number;

  @Expose({ name: 'MessagesPerSecond' })
  messagesPerSecond!: number;
}

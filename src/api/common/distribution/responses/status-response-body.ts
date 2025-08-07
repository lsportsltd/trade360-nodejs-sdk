import { Expose } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

/**
 * StatusResponseBody class is responsible for
 * deserializing the response from the distribution
 * API to a status response body.
 */
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

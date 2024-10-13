import { Expose } from 'class-transformer';

export class StatusResponseBody {
  @Expose({ name: 'IsDistributionOn' })
  isDistributionOn!: boolean;

  @Expose({ name: 'Consumers' })
  consumers!: string[];

  @Expose({ name: 'NumberMessagesInQueue' })
  numberMessagesInQueue!: number;

  @Expose({ name: 'MessagesPerSecond' })
  messagesPerSecond!: number;
}

export interface IStatusResponseBody {
  IsDistributionOn: boolean;
  Consumers: string[];
  NumberMessagesInQueue: number;
  MessagesPerSecond: number;
}

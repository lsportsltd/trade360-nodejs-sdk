import { MessageHeader } from '@entities';

export interface IBodyHandler {
  /**
   * process the inner procedure for the body property of an entity
   * @param body string that contains the body structure
   */
  processAsync(header: MessageHeader, body?: string): Promise<void>;
}

import { IMessageStructure } from './IMessageStructure';

export interface IBodyHandler {
  /**
   * process the inner procedure for the body property of an entity
   * @param messageStructure object that contains the message structure
   * with header and body
   */
  processAsync(messageStructure: IMessageStructure<unknown>): Promise<void>;
}

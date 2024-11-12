import { BaseEntity } from '@entities';

import { IMessageStructure } from './message-structure.interface';

/**
 * Interface for the body handler of an entity message structure
 */
export interface IBodyHandler {
  /**
   * process the inner procedure for the body property of an entity
   * @param messageStructure object that contains the message structure
   * with header and body
   */
  processAsync(messageStructure: IMessageStructure<BaseEntity>): Promise<void>;
}

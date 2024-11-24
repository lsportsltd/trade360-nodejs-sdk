import { BaseEntity } from '@entities';

import { IMessageStructure } from './message-structure.interface';

/**
 * Interface for the body handler of an entity message
 * structure to process the body property of an entity
 */
export interface IBodyHandler {
  /**
   * process the inner procedure for the body property
   * of an entity message structure to handle the entity
   * type with the entityHandler call-back function for
   * the entityConstructor class type entity type and
   * process them with the entityHandler call-back
   * function for the entityConstructor class type entity
   * type
   * @param messageStructure object that contains the
   * message structure with header and body
   */
  processAsync(messageStructure: IMessageStructure<BaseEntity>): Promise<void>;
}

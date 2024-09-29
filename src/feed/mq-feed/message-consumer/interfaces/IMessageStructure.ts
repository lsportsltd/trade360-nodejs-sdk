import { BaseEntity, MessageHeader } from '@entities';

/**
 * Interface for message structure
 */
export interface IMessageStructure<TEntity extends BaseEntity> {
  header: MessageHeader;
  body?: string;
  entity?: TEntity;
}

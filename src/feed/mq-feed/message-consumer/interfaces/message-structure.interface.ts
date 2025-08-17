import { BaseEntity, MessageHeader } from '@lsports/entities';

/**
 * Interface for message structure object to
 * represent the message structure with header,
 * body and entity properties to be used in the
 * message consumer and entity handler classes
 * @param TEntity entity type to be used in the message
 * structure object to represent the entity property
 */
export interface IMessageStructure<TEntity extends BaseEntity> {
  header: MessageHeader;
  body?: BaseEntity;
  entity?: TEntity;
}

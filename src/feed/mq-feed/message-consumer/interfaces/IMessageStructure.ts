import { BaseEntity, MessageHeader } from '@entities';

export interface IMessageStructure<TEntity extends BaseEntity> {
  header: MessageHeader;
  body?: string;
  entity?: TEntity;
}

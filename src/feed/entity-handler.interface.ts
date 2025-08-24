import { BaseEntity } from '@entities';

import { IMessageStructure } from '@feed/mq-feed';

/**
 * Interface that represent every entity handler
 * required implementation for the feed service
 * to handle the entity type with the entityHandler
 * call-back function for the entityConstructor class
 * type entity type
 */
export interface IEntityHandler<TEntity extends BaseEntity> {
  processAsync: ({ header, entity, transportHeaders }: IMessageStructure<TEntity>) => Promise<void>;
}

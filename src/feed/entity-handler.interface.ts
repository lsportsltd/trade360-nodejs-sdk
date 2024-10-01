import { BaseEntity } from '@entities';

import { IMessageStructure } from '@feed/mq-feed';

/**
 * Interface that represent every entity handler required implementation
 */
export interface IEntityHandler<TEntity extends BaseEntity> {
  processAsync: ({ header, entity }: IMessageStructure<TEntity>) => Promise<void>;
}

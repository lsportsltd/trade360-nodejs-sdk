import { BaseEntity, MessageHeader } from '@entities';

/**
 * Interface that represent every entity handler required implementation
 */
export interface IEntityHandler<TEntity extends BaseEntity> {
  processAsync: (header: MessageHeader, entity?: TEntity) => Promise<void>;
}

import { isNil } from 'lodash';

import { IEntityHandler } from '@feed';
import { BaseEntity } from '@entities';

import { IBodyHandler, IMessageStructure } from '../interfaces';
import { TransformerUtil } from '@lsports/entities';
import { ILogger } from '@logger';

export class BodyHandler<TEntity extends BaseEntity> implements IBodyHandler {
  constructor(
    private readonly entityHandler: IEntityHandler<TEntity>,
    private readonly entityConstructor: new () => TEntity,
    private readonly logger?: ILogger,
  ) {}

  async processAsync({ header, body }: IMessageStructure<unknown>): Promise<void> {
    try {
      const entity = !isNil(body)
        ? TransformerUtil.deserialize(JSON.parse(body), this.entityConstructor)
        : undefined;

      return await this.entityHandler.processAsync({ header, entity });
    } catch (err) {
      this.logger?.warn(
        `Failed to deserialize ${typeof this.entityConstructor} entity, Due to: ${err}`,
      );
    }
  }
}

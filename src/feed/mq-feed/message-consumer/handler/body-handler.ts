import { isNil } from 'lodash';

import { IEntityHandler } from '@feed';
import { BaseEntity } from '@entities';
import { TransformerUtil, BigIntSerializationUtil } from '@utilities';
import { ILogger } from '@logger';

import { IBodyHandler, IMessageStructure } from '../interfaces';

/**
 * Class that represent the body handler of an
 * entity message structure to process the body
 * property of an entity and handle the entity
 * type with the entityHandler call-back function
 * for the entityConstructor class type entity type
 * and process them with the entityHandler call-back
 * function for the entityConstructor class type
 * entity type and check message consumption latency
 * and log warning if it exceeds the threshold value
 * in seconds or log info if it's within the threshold
 * value in  seconds
 * @implements IBodyHandler interface that represent
 * the body handler of an entity message structure to
 * process the body property of an entity
 * @param TEntity entity type for the entityConstructor
 * class type entity type to be used in the body handler
 * class
 * @param entityHandler entity handler to be used in the
 * body handler class to handle the entity type with the
 * entityHandler call-back function for the entityConstructor
 * class type entity type
 * @param entityConstructor entity constructor class type
 * to be used in the body handler class to handle the entity
 * type with the entityHandler call-back function for the
 * entityConstructor class type entity type
 * @param logger logger instance to be used in the body
 * handler class to log the warning and info messages
 * for the message consumption latency
 */
export class BodyHandler<TEntity extends BaseEntity> implements IBodyHandler {
  constructor(
    private readonly entityHandler: IEntityHandler<TEntity>,
    private readonly entityConstructor: new () => TEntity,
    private readonly logger?: ILogger,
  ) {}

  /**
   * process the inner procedure for the body property of an
   * entity message structure to handle the entity type with
   * the entityHandler call-back function for the entityConstructor
   * class type entity type and process them with the entityHandler
   * call-back function for the entityConstructor class type entity
   * type
   * @param messageStructure object that contains the message
   * structure with header and body to be processed by the body
   * handler class to handle
   */
  async processAsync({ header, body }: IMessageStructure<BaseEntity>): Promise<void> {
    try {
      // Body is already a parsed BaseEntity object, no need for JSON.parse
      // ? TransformerUtil.transform(
      //     parse(body, undefined, BigIntSerializationUtil.customNumberParser) as BaseEntity,
      //     this.entityConstructor,
      //   )
      const entity = !isNil(body)
        ? TransformerUtil.transform(body as BaseEntity, this.entityConstructor)
        : undefined;

      return await this.entityHandler.processAsync({ header, entity });
    } catch (err) {
      const errorInfo = BigIntSerializationUtil.extractErrorInfo(err);
      this.logger?.warn(`Failed to deserialize ${this.entityConstructor.name} entity`, {
        error: errorInfo,
      });
      this.logger?.warn(
        `Failed to deserialize ${this.entityConstructor.name} entity, Due to: ${err}`,
      );
    }
  }
}

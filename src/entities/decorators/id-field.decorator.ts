import { Expose, Transform } from 'class-transformer';
import { IdTransformerUtil } from '../../utilities/id-transformer.util';

/**
 * Decorator for ID fields that automatically applies proper transformation and exposure.
 * Combines @Expose and @Transform decorators with standard ID handling logic.
 * 
 * @param exposeName - The name to expose the field as (defaults to 'Id')
 * @param fieldName - The name of the field for error reporting (defaults to 'Id')
 * @returns A property decorator that applies ID transformation
 * 
 * @example
 * ```typescript
 * export class MyEntity {
 *   @IdField()
 *   id!: string;
 * 
 *   @IdField('ParticipantId', 'ParticipantId')  
 *   participantId!: string;
 * }
 * ```
 */
export function IdField(exposeName: string = 'Id', fieldName: string = 'Id') {
  return function (target: any, propertyKey: string) {
    // Apply @Expose decorator
    Expose({ name: exposeName })(target, propertyKey);
    
    // Apply @Transform decorator with ID transformation logic
    Transform(IdTransformerUtil.createIdTransform(fieldName))(target, propertyKey);
  };
}
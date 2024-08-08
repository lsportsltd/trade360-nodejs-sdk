import { Expose, Transform, TransformPlainToInstance, Type,  } from "class-transformer";
import "reflect-metadata";

import { MessageHeader } from "./messageHeader";


export function RenameProperty(newName: string) {
  return function(target: any, propertyKey: string) {
    // Store the new name in metadata
    Reflect.defineMetadata('customName', newName, target, propertyKey);

    // Use Transform decorator to change the property name during transformation
    Transform(({ obj, key }) => {
      const customName = Reflect.getMetadata('customName', target, key) || key;
      // return obj[customName];
      const value = obj[customName];
      delete obj[customName];
      return value;
    }, { toClassOnly: true })(target, propertyKey);
  }
}

const  renameProperty = (obj : any, originalNme: string) => {
  const value = obj[originalNme];
  delete obj[originalNme];
  return value;
}

export class WrappedMessage {
  @Expose({ name: 'Header' })
  @Type(() => MessageHeader)
  public header!: MessageHeader;

  @Expose({ name: 'Body' })
  @Transform(({ obj }) => JSON.stringify(obj.Body))
  public body?: string;
}

function pascalToCamelCase(input: string): string {
  return input.charAt(0).toLowerCase() + input.slice(1);
}



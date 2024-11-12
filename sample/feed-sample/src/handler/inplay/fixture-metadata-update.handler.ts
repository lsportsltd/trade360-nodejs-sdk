import { IEntityHandler, FixtureMetadataUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class FixtureMetadataUpdateHandler implements IEntityHandler<FixtureMetadataUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<FixtureMetadataUpdate>) => {
    console.log('FixtureMetadataUpdate received!');
    console.log(entity);
    return;
  };
}

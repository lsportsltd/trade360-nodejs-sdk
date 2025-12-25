import { IEntityHandler, FixtureMetadataUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class FixtureMetadataUpdateHandler implements IEntityHandler<FixtureMetadataUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<FixtureMetadataUpdate>) => {
    console.log('FixtureMetadataUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      fixtureId: transportHeaders.fixtureId,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    // Entities are wrapped in metadata update classes with events[] arrays
    if (entity?.events) {
      entity.events.forEach((event) => {
        console.log('Fixture Event:', event);
      });
    }
    return;
  };
}

import { IEntityHandler, FixtureMetadataUpdate, MessageHeader } from "trade360-nodejs-sdk";

export class FixtureMetadataUpdateHandler
  implements IEntityHandler<FixtureMetadataUpdate>
{
  public processAsync = async (header: MessageHeader, entity?: FixtureMetadataUpdate) => {
    console.log("FixtureMetadataUpdate received!");
    console.log(entity);
    return;
  };
}

import { IEntityHandler, FixtureMetadataUpdate } from "trade360-nodejs-sdk";

export class FixtureMetadataUpdateHandler
  implements IEntityHandler<FixtureMetadataUpdate>
{
  public processAsync = async (entity?: FixtureMetadataUpdate) => {
    console.log("FixtureMetadataUpdate received!");
    console.log(entity);
    return;
  };
}

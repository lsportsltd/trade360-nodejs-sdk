import { Expose, Type } from "class-transformer";
import { EntityKey } from "../decorators";
import { FixtureEvent } from "../entities";

@EntityKey(1)
export class FixtureMetadataUpdate {
  @Expose({ name: 'Events' })
  @Type(() => FixtureEvent)
  public events!: FixtureEvent[];
}

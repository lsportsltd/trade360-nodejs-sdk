import { EntityKey } from "../decorators";
import { FixtureEvent } from "../entities";

@EntityKey(1)
export class FixtureMetadataUpdate {
  public Events!: FixtureEvent[];
}

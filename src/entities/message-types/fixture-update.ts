import { EntityType } from "../decorators";
import { FixtureEvent } from "../entities";
import { BasicUpdate } from "./basic-update";

@EntityType(1)
export class FixtureUpdate extends BasicUpdate{
  public Events!: FixtureEvent[];
}
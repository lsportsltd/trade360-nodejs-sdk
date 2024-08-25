import { Expose, Transform } from "class-transformer";

import { BaseEntity } from "../../message-types";
import { deserializeToEventClass } from "../utils";

// export class OutrightLeagueCompetitions<TEvent extends BaseEntityClass> {
export class OutrightLeagueCompetitions<TEvent extends BaseEntity> {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Type" })
  type?: number;

  @Expose({ name: "Events" })
  @Transform(({ value }) => {
    return deserializeToEventClass(value);
  })
  events?: TEvent[];
}

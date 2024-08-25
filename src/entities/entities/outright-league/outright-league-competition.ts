import { Expose, Type } from "class-transformer";

import { BaseEntity } from "../../message-types";
import { OutrightLeagueCompetitions } from "./outright-league-competitions";

// export class OutrightLeagueCompetition<TEvent extends BaseEntityClass> {
  export class OutrightLeagueCompetition<TEvent extends BaseEntity> {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Type" })
  type?: number;

  @Expose({ name: "Competitions" })
  @Type(() => OutrightLeagueCompetitions)
  competitions?: OutrightLeagueCompetitions<TEvent>[];
}

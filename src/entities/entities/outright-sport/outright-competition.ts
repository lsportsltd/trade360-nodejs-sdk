import { Expose, Transform, plainToInstance } from "class-transformer";
import { isArray, isEmpty, isNil } from "lodash";

// import { BaseEvent } from "./base-event";
import { OutrightFixtureEvent } from "./outright-fixture-event";
import { OutrightScoreEvent } from "./outright-score-event";

import { BaseEntityClass } from "../../message-types";
import { getEventClass } from "../utils";

// export class OutrightCompetition<TEvent extends BaseEvent> {
export class OutrightCompetition<TEvent extends BaseEntityClass> {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Type" })
  type?: number;

  @Expose({ name: "Events" })
  @Transform(
    ({ value }) => {
      // return deserializeToEventClass(value)

      if (!isArray(value) || (isArray(value) && isEmpty(value))) return value;

      const propertyEventClass = getEventClass(value[0]);

      if (!isNil(propertyEventClass))
        return value.map((event: any) => {
          return plainToInstance(propertyEventClass, event);
        });

      return value;
    },
    { toClassOnly: true }
  )
  events?: TEvent[];
}

export class OutrightScoreCompetition extends OutrightCompetition<OutrightScoreEvent> {
  // @Expose({ name: "Events" })
  // @Type(() => OutrightScoreEvent)
  // events?: OutrightScoreEvent[];
}

export class OutrightFixtureCompetition extends OutrightCompetition<OutrightFixtureEvent> {
  // @Expose({ name: "Events" })
  // @Type(() => OutrightFixtureEvent)
  // events?: OutrightFixtureEvent[];
}

export class OutrightFixtureMarketCompetition extends OutrightCompetition<any> {
  // @Expose({ name: "Events" })
  // @Type(() => MarketEvent)
  // events?: MarketEvent[];
}

export class OutrightSettlementsCompetition extends OutrightCompetition<any> {
  // @Expose({ name: "Events" })
  // @Type(() => MarketEvent)
  // events?: MarketEvent[];
}

import { Expose, Type } from "class-transformer";

import { OutrightFixtureEvent } from "./outright-fixture-event";
import { OutrightScoreEvent } from "./outright-score-event";

import "reflect-metadata";
// import { MarketEvent } from "../market";

import { BaseEntityClass } from "../../message-types";
import { MarketEvent } from "../market";

// export type OutrightEventType =
//   | OutrightFixtureEvent
//   | OutrightScoreEvent
//   | MarketEvent;

export class OutrightCompetition<TEvent extends BaseEntityClass> {
  @Expose({ name: "Id" })
  id?: number;

  @Expose({ name: "Name" })
  name?: string;

  @Expose({ name: "Type" })
  type?: number;

  // @Expose({ name: "Events" })
  // @Type(() => OutrightScoreEvent)
  // @Type(() => TEvent)
  // @Type(() => OutrightFixtureEvent | OutrightScoreEvent)
  // @Type(() => BaseEntityClass)
  // @TypeGeneric()
  // @Type(() => )
  // @TypeGeneric<TEvent>()
  // events?: OutrightFixtureEvent | OutrightScoreEvent[];

  // events?: any[];
}

export class OutrightScoreCompetition extends OutrightCompetition<any> {
  @Expose({ name: "Events" })
  @Type(() => OutrightScoreEvent)
  events?: OutrightScoreEvent[];
}

export class OutrightFixtureCompetition extends OutrightCompetition<any> {
  @Expose({ name: "Events" })
  @Type(() => OutrightFixtureEvent)
  events?: OutrightFixtureEvent[];
}

export class OutrightFixtureMarketCompetition extends OutrightCompetition<any> {
  @Expose({ name: "Events" })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}

export class OutrightSettlementsCompetition extends OutrightCompetition<any> {
  @Expose({ name: "Events" })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}


/** 
const eventTypeKey = Symbol("eventType");

function TypeGeneric<T extends BaseEntityClass>() {
  return function (target: any, key: string) {
    Transform(
      ({ obj, key }) => {
        const eventType = (obj.constructor as any)[eventTypeKey];
        if (!eventType) {
          throw new Error("Event type not set for this container");
        }
        if (Array.isArray(obj[key])) {
          return obj[key].map((item: any[]) => plainToClass(eventType, item));
        }
        return plainToClass(eventType, obj[key]);
      },
      { toClassOnly: true }
    )(target, key);
  };
}

function SetEventType<T>(eventType: new () => T) {
  // return function(target: new () => any) {
  //   (target as any)[eventTypeKey] = eventType;
  // };
  return function (constructor: Function) {
    constructor.prototype[eventTypeKey] = eventType;
  };
}

@SetEventType(OutrightFixtureEvent)
export class OutrightFixCompetition extends OutrightCompetition<OutrightFixtureEvent> {}

@SetEventType(OutrightScoreEvent)
export class OutrightLsCompetition extends OutrightCompetition<OutrightScoreEvent> {}

const aa = new OutrightLsCompetition();
console.log(aa);
*/

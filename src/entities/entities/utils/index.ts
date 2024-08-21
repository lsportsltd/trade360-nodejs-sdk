import { plainToInstance } from "class-transformer";
import { find, has, isArray, isEmpty, isNil, keys } from "lodash";

import { OutrightFixtureEvent } from "../outright-sport/outright-fixture-event";
import { OutrightScoreEvent } from "../outright-sport/outright-score-event";
import { MarketEvent } from "../market";

interface IEventTypeMap {
  OutrightScore: typeof OutrightScoreEvent;
  OutrightFixture: typeof OutrightFixtureEvent;
  Markets: typeof MarketEvent;
}

const eventTypeMap: IEventTypeMap = {
  OutrightScore: OutrightScoreEvent,
  OutrightFixture: OutrightFixtureEvent,
  Markets: MarketEvent,
};

export const getEventClass = (obj: Record<any, any>) => {
  const eventType = find(keys(eventTypeMap), (key) => has(obj, key));
  console.log(eventTypeMap);
  return eventTypeMap[eventType as keyof IEventTypeMap];
};

export const deserializeToEventClass = (value: any) => {
  if (!isArray(value) || (isArray(value) && isEmpty(value))) return value;
  /*
      // TODO: not need to check each, all are one of the same type
      // return value.map((event: any) => {
      //   if ("OutrightScore" in event) {
      //     return plainToInstance(OutrightScoreEvent, event);
      //   } else if ("OutrightFixture" in event) {
      //     return plainToInstance(OutrightFixtureEvent, event);
      //   } else if ("Markets" in event) {
      //     return plainToInstance(MarketEvent, event);
      //   }
      //   return event;
      // });
      */

  const propertyEventClass = getEventClass(value[0]);

  return value.map((event: any) => {
    if (!isNil(propertyEventClass))
      return plainToInstance(propertyEventClass, event);
    return event;
  });
};

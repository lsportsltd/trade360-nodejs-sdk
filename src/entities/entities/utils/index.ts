import { plainToInstance } from "class-transformer";
import { find, has, isArray, isEmpty, isNil, keys } from "lodash";

import { MarketEvent } from "../market";
import { OutrightLeagueFixtureEvent } from "../outright-league";
import { OutrightFixtureEvent, OutrightScoreEvent } from "../outright-sport";

interface IEventTypeMap {
  OutrightScore: typeof OutrightScoreEvent;
  OutrightFixture: typeof OutrightFixtureEvent;
  Markets: typeof MarketEvent;
  OutrightLeague: typeof OutrightLeagueFixtureEvent;
}

const eventTypeMap: IEventTypeMap = {
  OutrightScore: OutrightScoreEvent,
  OutrightFixture: OutrightFixtureEvent,
  Markets: MarketEvent,
  OutrightLeague: OutrightLeagueFixtureEvent,
};

const getEventClass = (obj: Record<any, any>) => {
  const eventType = find(
    keys(eventTypeMap),
    (key) => has(obj, key) && !isNil(obj[key])
  );
  return eventTypeMap[eventType as keyof IEventTypeMap];
};

export const deserializeToEventClass = (value: any) => {
  if (!isArray(value) || (isArray(value) && isEmpty(value))) return value;

  const propertyEventClass = getEventClass(value[0]);

  return value.map((event: any) => {
    if (!isNil(propertyEventClass))
      return plainToInstance(propertyEventClass, event);
    return event;
  });
};

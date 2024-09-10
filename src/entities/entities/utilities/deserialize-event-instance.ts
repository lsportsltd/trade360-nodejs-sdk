import { find, has, isArray, isEmpty, isNil, keys } from "lodash";

import {
  MarketEvent,
  OutrightFixtureEvent,
  OutrightLeagueFixtureEvent,
  OutrightScoreEvent,
  TransformerUtil,
} from "@lsports/entities";

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

export const deserializeToEventInstance = (value: any) => {
  if (!isArray(value) || (isArray(value) && isEmpty(value))) return value;

  const propertyEventClass = getEventClass(value[0]);

  if (!isNil(propertyEventClass))
    return TransformerUtil.deserializeArray(value, propertyEventClass);
  return value;
};

const getEventClass = (obj: Record<any, any>) => {
  const eventType = find(
    keys(eventTypeMap),
    (key) => has(obj, key) && !isNil(obj[key])
  );
  return eventTypeMap[eventType as keyof IEventTypeMap];
};

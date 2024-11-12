import { find, has, isArray, isEmpty, isNil, keys } from 'lodash';

import {
  MarketEvent,
  OutrightFixtureEvent,
  OutrightLeagueFixtureEvent,
  OutrightScoreEvent,
} from '@lsports/entities';
import { TransformerUtil } from '@utilities';

/**
 * interface for event type map
 */
interface IEventTypeMap {
  OutrightScore: typeof OutrightScoreEvent;
  OutrightFixture: typeof OutrightFixtureEvent;
  Markets: typeof MarketEvent;
  OutrightLeague: typeof OutrightLeagueFixtureEvent;
}

/**
 * map of event types to event classes
 */
const eventTypeMap: IEventTypeMap = {
  OutrightScore: OutrightScoreEvent,
  OutrightFixture: OutrightFixtureEvent,
  Markets: MarketEvent,
  OutrightLeague: OutrightLeagueFixtureEvent,
};

/**
 * get the event class based on the object properties
 * @param obj the object to be checked
 * @returns the event class
 */
function getEventClass(
  obj: Record<string, unknown>,
):
  | typeof OutrightScoreEvent
  | typeof OutrightFixtureEvent
  | typeof MarketEvent
  | typeof OutrightLeagueFixtureEvent {
  const eventType = find(keys(eventTypeMap), (key) => has(obj, key) && !isNil(obj[key]));
  return eventTypeMap[eventType as keyof IEventTypeMap];
}
/**
 * tranform to event instance array by checking the type of the event
 * @param value the value to be transformed to event instance array
 * @returns event instance array
 */
export function transformToEventInstance(
  value: unknown,
): OutrightScoreEvent | OutrightFixtureEvent | MarketEvent | OutrightLeagueFixtureEvent | unknown {
  if (!isArray(value) || (isArray(value) && isEmpty(value))) return value;

  const propertyEventClass = getEventClass(value[0]);

  if (!isNil(propertyEventClass)) return TransformerUtil.transformArray(value, propertyEventClass);
  return value;
}

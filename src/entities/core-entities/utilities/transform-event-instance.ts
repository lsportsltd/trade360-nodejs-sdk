import { find, has, isArray, isEmpty, isNil, keys } from 'lodash';

import { MarketEvent } from '../market/market-event';
import { OutrightFixtureEvent } from '../outright-sport/outright-fixture-event';
import { OutrightScoreEvent } from '../outright-sport/outright-score-event';
import { OutrightLeagueFixtureEvent } from '../outright-league/outright-league-fixture-event';
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
 * Resolved at call time so event classes are defined even when this module
 * loads while core-entities/index.ts is still initializing (TR-23836).
 */
function getEventTypeMap(): IEventTypeMap {
  return {
    OutrightScore: OutrightScoreEvent,
    OutrightFixture: OutrightFixtureEvent,
    Markets: MarketEvent,
    OutrightLeague: OutrightLeagueFixtureEvent,
  };
}

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
  const eventTypeMap = getEventTypeMap();
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

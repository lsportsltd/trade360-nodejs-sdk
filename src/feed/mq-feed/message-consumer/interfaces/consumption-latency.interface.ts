/**
 * Interface for consumption latency object to check message
 * consumption latency and log warning if it exceeds the
 * threshold value in seconds or log info if it's within the
 * threshold value in seconds. If message or threshold is
 * missing, log warning message with the message guid provided
 * in the input object parameter and return void
 * @param messageMqTimestamp message timestamp in milliseconds
 * to calculate the message consumption latency in seconds
 * @param consumptionLatencyThreshold consumption latency
 * threshold in seconds to check if the message consumption
 * latency exceeds the threshold value in seconds or not
 * @param msgGuid message guid to be logged in the warning
 * message if the message or threshold is missing
 * @returns void
 */
export interface IConsumptionLatency {
  messageMqTimestamp?: number;
  consumptionLatencyThreshold?: number;
  msgGuid?: string;
}

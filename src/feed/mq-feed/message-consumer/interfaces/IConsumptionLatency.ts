/**
 * Interface for consumption latency
 */
export interface IConsumptionLantency {
  messageMqTimestamp?: number;
  consumptionLatencyThreshold?: number;
  msgGuid?: string;
}

/**
 * Interface for consumption latency
 */
export interface IConsumptionLatency {
  messageMqTimestamp?: number;
  consumptionLatencyThreshold?: number;
  msgGuid?: string;
}

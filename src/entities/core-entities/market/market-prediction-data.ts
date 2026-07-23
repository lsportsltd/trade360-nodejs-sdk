import { Expose } from 'class-transformer';

export class MarketPredictionData {
  @Expose({ name: 'Volume' })
  volume?: number;
}

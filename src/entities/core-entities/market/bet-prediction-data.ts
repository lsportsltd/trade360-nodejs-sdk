import { Expose, Type } from 'class-transformer';

export class BetPredictionData {
  @Expose({ name: 'Volume' })
  volume?: number;

  @Expose({ name: 'Liquidity' })
  liquidity?: number;

  @Expose({ name: 'StartDate' })
  @Type(() => Date)
  startDate?: Date;

  @Expose({ name: 'EndDate' })
  @Type(() => Date)
  endDate?: Date;
}

import { Expose } from 'class-transformer';

export class MarketBodyStructure {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'IsSettleable' })
  isSettleable?: boolean;
}

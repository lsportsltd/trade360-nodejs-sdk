import { Expose, Type } from 'class-transformer';

import { Result } from './result';
import { Incident } from './incident';

export class Period {
  @Expose({ name: 'Type' })
  type?: number;

  @Expose({ name: 'IsFinished' })
  isFinished?: boolean;

  @Expose({ name: 'IsConfirmed' })
  isConfirmed?: boolean;

  @Expose({ name: 'Results' })
  @Type(() => Result)
  results?: Result[];

  @Expose({ name: 'Incidents' })
  @Type(() => Incident)
  incidents?: Incident[];

  @Expose({ name: 'SubPeriods' })
  @Type(() => Period)
  subPeriods?: Period[];

  @Expose({ name: 'SequenceNumber' })
  sequenceNumber?: number;
}

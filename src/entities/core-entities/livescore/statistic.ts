import { Expose, Type } from 'class-transformer';

import { StatisticType } from '@lsports/enums';

import { Incident } from './incident';
import { Result } from './result';

export class Statistic {
  @Expose({ name: 'Type' })
  // TODO: Change StatisticType to number because it's will require endless mapping and maintenance
  // changing and adding new values to StatisticType repeatedly
  type?: StatisticType;

  @Expose({ name: 'Results' })
  @Type(() => Result)
  results?: Result[];

  @Expose({ name: 'Incidents' })
  @Type(() => Incident)
  incidents?: Incident[];
}

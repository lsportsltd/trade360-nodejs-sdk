import { Expose, Type } from 'class-transformer';

import { DangerIndicatorStatus, DangerIndicatorType } from '@lsports/enums';

export class DangerIndicator {
  @Expose({ name: 'Type' })
  type?: DangerIndicatorType;

  @Expose({ name: 'Status' })
  status?: DangerIndicatorStatus;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate?: Date;
}

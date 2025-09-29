import { Expose, Type } from 'class-transformer';

import { IncidentConfirmation } from '@lsports/enums';

export class CurrentIncident {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: 'Confirmation' })
  confirmation?: IncidentConfirmation;
}

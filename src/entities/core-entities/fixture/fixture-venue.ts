import { Expose, Type } from 'class-transformer';

import { CourtSurface, VenueAssignment, VenueEnvironment } from '@lsports/enums';
import { IdNNameRecord } from '@lsports/entities/common';

export class FixtureVenue {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Capacity' })
  public capacity?: number;

  @Expose({ name: 'Attendance' })
  public attendance?: number;

  @Expose({ name: 'CourtSurfaceType' })
  public courtSurfaceType?: CourtSurface;

  @Expose({ name: 'Environment' })
  public environment?: VenueEnvironment;

  @Expose({ name: 'Assignment' })
  public assignment?: VenueAssignment;

  @Expose({ name: 'Country' })
  @Type(() => IdNNameRecord)
  public country?: IdNNameRecord;

  @Expose({ name: 'State' })
  @Type(() => IdNNameRecord)
  public state?: IdNNameRecord;

  @Expose({ name: 'City' })
  @Type(() => IdNNameRecord)
  public city?: IdNNameRecord;
}

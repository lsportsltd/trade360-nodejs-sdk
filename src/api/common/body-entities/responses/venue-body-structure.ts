import { IdNNameRecord } from '@lsports/entities/common';
import { Expose, Type } from 'class-transformer';

/**
 * VenueBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a venue.
 */
export class VenueBodyStructure {
  @Expose({ name: 'VenueId' })
  public venueId?: number;

  @Expose({ name: 'Name' })
  public name?: string;

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

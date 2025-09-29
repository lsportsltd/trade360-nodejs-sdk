import { IdNNameRecord } from '@lsports/entities/common';
import { Expose, Type } from 'class-transformer';

/**
 * CityBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a city.
 */
export class CityBodyStructure {
  @Expose({ name: 'CityId' })
  public cityId?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Country' })
  @Type(() => IdNNameRecord)
  public country?: IdNNameRecord;

  @Expose({ name: 'State' })
  @Type(() => IdNNameRecord)
  public state?: IdNNameRecord;
}

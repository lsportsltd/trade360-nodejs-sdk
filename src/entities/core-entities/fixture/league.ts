import { Expose, Type } from 'class-transformer';

import { IdNNameRecord } from '@lsports/entities/common';

export class League {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Tour' })
  @Type(() => IdNNameRecord)
  public tour?: IdNNameRecord;

  @Expose({ name: 'AgeCategory' })
  public ageCategory?: number;

  @Expose({ name: 'Gender' })
  public gender?: number;

  @Expose({ name: 'Type' })
  public type?: number;

  @Expose({ name: 'NumberOfPeriods' })
  public numberOfPeriods?: number;

  @Expose({ name: 'SportCategory' })
  @Type(() => IdNNameRecord)
  public sportCategory?: IdNNameRecord;
}

import { Expose, Type } from 'class-transformer';

import { ActiveParticipant } from '@lsports/enums';
import { NameValueRecord } from '@lsports/entities/common';
import { FixturePlayer } from '../fixture/fixture-player';

export class OutrightParticipant {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Position' })
  position?: string;

  @Expose({ name: 'RotationId' })
  public rotationId?: number;

  @Expose({ name: 'IsActive' })
  isActive?: ActiveParticipant;

  @Expose({ name: 'Form' })
  public form?: string;

  @Expose({ name: 'Formation' })
  public formation?: string;

  @Expose({ name: 'FixturePlayers' })
  @Type(() => FixturePlayer)
  public fixturePlayers?: FixturePlayer[];

  @Expose({ name: 'Gender' })
  public gender?: number;

  @Expose({ name: 'AgeCategory' })
  public ageCategory?: number;

  @Expose({ name: 'Type' })
  public type?: number;

  @Expose({ name: 'ExtraData' })
  @Type(() => NameValueRecord)
  extraData?: NameValueRecord[];
}

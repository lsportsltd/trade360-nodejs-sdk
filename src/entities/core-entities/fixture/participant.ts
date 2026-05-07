import { ActiveParticipant } from '@lsports/enums';
import { Expose, Type } from 'class-transformer';

import { FixturePlayer } from './fixture-player';
import { UniformColor } from './uniform-color';

export class Participant {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Position' })
  public position?: string;

  @Expose({ name: 'RotationId' })
  public rotationId?: number;

  @Expose({ name: 'IsActive' })
  public isActive?: ActiveParticipant;

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

  @Expose({ name: 'ShirtColor' })
  @Type(() => UniformColor)
  public shirtColor?: UniformColor;

  @Expose({ name: 'GoalKeeperShirtColor' })
  @Type(() => UniformColor)
  public goalKeeperShirtColor?: UniformColor;
}

import { Expose, Type } from 'class-transformer';

import { PlayerType } from '@lsports/enums';

export class FixturePlayerInfo {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'TeamId' })
  public teamId?: number;

  @Expose({ name: 'NationalityId' })
  public nationalityId?: number;

  @Expose({ name: 'BirthDate' })
  @Type(() => Date)
  public birthDate?: Date;

  @Expose({ name: 'Type' })
  public type?: PlayerType;

  @Expose({ name: 'NationalTeamId' })
  public nationalTeamId?: number;
}






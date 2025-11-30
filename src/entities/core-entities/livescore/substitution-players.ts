import { Expose, Type } from 'class-transformer';

import { SubstitutionPlayer } from './substitution-player';

export class SubstitutionPlayers {
  @Expose({ name: 'Item1' })
  @Type(() => SubstitutionPlayer)
  item1?: SubstitutionPlayer[];

  @Expose({ name: 'Item2' })
  @Type(() => SubstitutionPlayer)
  item2?: SubstitutionPlayer[];
}


import { Expose, Type } from 'class-transformer';

import { Player } from './player';

export class Players {
  @Expose({ name: 'Item1' })
  @Type(() => Player)
  item1?: Player[];

  @Expose({ name: 'Item2' })
  @Type(() => Player)
  item2?: Player[];
}

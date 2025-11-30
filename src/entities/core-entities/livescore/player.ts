import { Expose } from 'class-transformer';

export class Player {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;
}

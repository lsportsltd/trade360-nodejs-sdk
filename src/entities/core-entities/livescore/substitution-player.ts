import { Expose } from 'class-transformer';

export class SubstitutionPlayer {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;
}


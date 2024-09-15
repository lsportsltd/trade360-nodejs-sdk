import { Expose } from 'class-transformer';

export class Participant {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Position' })
  public position?: string;
}

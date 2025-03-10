import { Expose } from 'class-transformer';

export class Location {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;
}

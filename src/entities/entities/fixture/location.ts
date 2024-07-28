import { Expose } from "class-transformer";

export class Location {
  @Expose({name: 'id'})
  public Id?: number;
  @Expose({name: 'name'})
  public Name?: string;
}

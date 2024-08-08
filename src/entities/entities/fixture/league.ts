import { Expose } from "class-transformer";

export class League {
  @Expose({ name: "Id" })
  public id?: number;

  @Expose({ name: "Name" })
  public name?: string;
}

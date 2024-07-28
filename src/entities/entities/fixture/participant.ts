import { Expose } from "class-transformer";

export class Participant {
  @Expose({ name: "id" })
  public Id?: number;

  @Expose({ name: "name" })
  public Name?: string;

  @Expose({ name: "position" })
  public Position?: string;
}

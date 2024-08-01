import { Expose } from "class-transformer";

export class Result {
  @Expose({ name: "position" })
  Position?: string;

  @Expose({ name: "value" })
  Value?: string;
}

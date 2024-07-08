export interface ITrade360RequestBody {
  PackageId: string;
  UserName: string;
  Password: string;
}

export interface ITrade360ResponsePayload {
  Header: Record<"HttpStatusCode", number>;
  Body: IStatusResponseBodyProperty | IStartResponseBodyProperty | IStopResponseBodyProperty;
}

interface IStatusResponseBodyProperty {
  IsDistributionOn: boolean;
  Consumers: string[];
  NumberMessagesInQueue: number;
  MessagesPerSecond: number;
}

interface IStartResponseBodyProperty {
  Message: "Distribution is: Active" | "Distribution is already Active";
}

interface IStopResponseBodyProperty {
  Message: "Distribution is: Inactive" | "Distribution is already Inactive";
}

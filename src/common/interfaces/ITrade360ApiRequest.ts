
export interface ITrade360Request {
  startDistribution: ()=>Promise<void>;
  stopDistribution: ()=>Promise<void>;
  // getDistributionStatus: ()=>Promise<ITrade360StatusResponsePayload | void>;
  getDistributionStatus: ()=>Promise<boolean | void>;

  postRequest: () => void;
}

export interface IFeed {
  start: () => any;
  stop: () => any;
  addEntityHandler: (cd: Function) => void;
}
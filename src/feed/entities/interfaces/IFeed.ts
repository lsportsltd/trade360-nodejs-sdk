export interface IFeed {
    startAsync : ( ) => any;
    stopAsync: ( ) => any;
    addEntityHandler: ( cd : Function) => void;
}
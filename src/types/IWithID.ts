export interface IWithID<T extends string> {
  getID(): T;
}

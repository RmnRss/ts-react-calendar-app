import IEvent from "./IEvent";

export default interface IDay {
  date: Date;
  events?: Array<IEvent>;
}

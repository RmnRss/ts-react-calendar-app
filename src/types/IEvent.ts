export default interface IEvent {
  id: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  title: string;
  description?: string;
}

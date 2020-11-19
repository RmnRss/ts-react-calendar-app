import IEvent from "../types/IEvent";

export function createFakeDays(): Array<Date> {
  const days: Array<Date> = [];

  for (let i: number = 0; i < 30; i++) {
    days.push(new Date());
  }

  return days;
}

export function createFakeEvents(): Array<IEvent> {
  const ev: Array<IEvent> = [];

  for (let i: number = 0; i < 2; i++) {
    ev.push({
      id: i,
      dateTimeStart: new Date(2020, 10, 19, 14, 2, 0, 0),
      dateTimeEnd: new Date(2020, 10, 19, 15, 2, 0, 0),
      title: "event",
      description: "this is an event",
    });
  }

  return ev;
}

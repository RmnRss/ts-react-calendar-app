import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import IEvent from "../types/IEvent";

export function createFakeEvents(): Array<IEvent> {
  const ev: Array<IEvent> = [];

  for (let i: number = 0; i < 2; i++) {
    ev.push({
      id: i,
      dateTimeStart: new Date(2021, 4, 19, 14, 2, 0, 0),
      dateTimeEnd: new Date(2021, 4, 19, 15, 2, 0, 0),
      title: "event",
      description: "this is an event",
    });
  }

  return ev;
}

export function getDaysOfTheMonth(date: Date): Array<Date> {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
}

export function getAllWeeksOfMonth(date: Date): Array<Date> {
  const firstDayMonth = startOfMonth(date);
  const lastDayMonth = endOfMonth(date);

  let daysBefore: Array<Date> = [];
  let daysAfter: Array<Date> = [];

  // If the first day of the month isn't a monday we get the days until the previous monday
  if (firstDayMonth.getDay() !== 1) {
    daysBefore = eachDayOfInterval({
      start: startOfWeek(firstDayMonth, { weekStartsOn: 1 }),
      end: subDays(firstDayMonth, 1),
    });
  }

  // If last day isn't a sunday we get the days until the next sunday
  if (lastDayMonth.getDay() !== 0) {
    daysAfter = eachDayOfInterval({
      start: addDays(lastDayMonth, 1),
      end: endOfWeek(lastDayMonth, { weekStartsOn: 1 }),
    });
  }

  return [...daysBefore, ...getDaysOfTheMonth(date), ...daysAfter];
}

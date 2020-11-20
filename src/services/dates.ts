import {
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfMonth,
  endOfWeek,
  setHours,
  setMinutes,
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

interface HourItem {
  key: string;
  value: number;
}

/**
 * Takes a day and return a dictionary of hours anf their decimal value
 * @param day containing the hours we want
 */
export function getHoursOfADay(day: Date): Array<HourItem> {
  const hoursByQuarter: Array<HourItem> = [];

  const datesWithHours = eachHourOfInterval({
    start: setHours(day, 0),
    end: setHours(day, 23),
  });

  for (let date of datesWithHours) {
    const hour = date.getHours();

    hoursByQuarter.push({ key: `${hour}:00`, value: hour });
    hoursByQuarter.push({ key: `${hour}:15`, value: hour + 0.25 });
    hoursByQuarter.push({ key: `${hour}:30`, value: hour + 0.5 });
    hoursByQuarter.push({ key: `${hour}:45`, value: hour + 0.75 });
  }

  return hoursByQuarter;
}

/**
 * sets hours and minutes to a given date
 * @param day containing the hours we want
 * @param decimalHours time to set in decimals (e.g 8.5 for 8:30)
 */
export function setHoursAndMinutes(day: Date, decimalHours: number): Date {
  const dateWithHours = setHours(day, decimalHours);
  const minutes = (decimalHours - dateWithHours.getHours()) * 60;

  return setMinutes(dateWithHours, minutes);
}

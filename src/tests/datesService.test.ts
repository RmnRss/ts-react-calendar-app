import { getAllWeeksOfMonth, getDaysOfTheMonth } from "../services/dates";

test("getDaysOfTheMonth returns an array", () => {
  const february = getDaysOfTheMonth(new Date("February 2020"));
  expect(Array.isArray(february)).toBe(true);
});

test("getDaysOfTheMonth returns the correct number of days", () => {
  const february = getDaysOfTheMonth(new Date("February 2020"));

  expect(february.length).toBe(29);
});

test("getAllWeeksOfMonth returns an array", () => {
  const february = getAllWeeksOfMonth(new Date("February 2020"));
  expect(Array.isArray(february)).toBe(true);
});

test("getAllWeeksOfMonth returns the correct number of days", () => {
  const february = getAllWeeksOfMonth(new Date("February 2020"));
  expect(february.length).toBe(35);
});

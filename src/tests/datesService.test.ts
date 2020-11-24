import {
  getAllWeeksOfMonth,
  getDaysOfTheMonth,
  getHoursOfADay,
  setHoursAndMinutes,
} from "../services/dates";

// Days of the Month
describe("Date Service", function () {
  it("getDaysOfTheMonth returns an array", () => {
    const february = getDaysOfTheMonth(new Date("February 2020"));
    expect(Array.isArray(february)).toBe(true);
  });

  it("getDaysOfTheMonth returns the correct number of days", () => {
    const february = getDaysOfTheMonth(new Date("February 2020"));

    expect(february.length).toBe(29);
  });

  // All Weeks

  it("getAllWeeksOfMonth returns an array", () => {
    const february = getAllWeeksOfMonth(new Date("February 2020"));
    expect(Array.isArray(february)).toBe(true);
  });

  it("getAllWeeksOfMonth returns the correct number of days", () => {
    const february = getAllWeeksOfMonth(new Date("February 2020"));
    expect(february.length).toBe(35);
  });

  // Hours of a day

  it("getHoursOfADay returns the correct number of objects", () => {
    const hours = getHoursOfADay(new Date("February 2020"));
    // 24h * 4 objects per hours (00, 15, 30, 45)
    expect(hours.length).toBe(24 * 4);
  });

  it("getHoursOfADay returns the correct type of objects", () => {
    const hours = getHoursOfADay(new Date("February 2020"));

    expect(hours[0]).toMatchObject({ key: "0:00", value: 0 });
    expect(hours[1]).toMatchObject({ key: "0:15", value: 0.25 });
    expect(hours[2]).toMatchObject({ key: "0:30", value: 0.5 });
    expect(hours[3]).toMatchObject({ key: "0:45", value: 0.75 });
  });

  // Hours and minutes

  it("setHoursAndMinutes returns the correct Date with hours and minutes", () => {
    const testedDate = setHoursAndMinutes(new Date("21 February 2020"), 8.75);

    expect(testedDate.getHours()).toBe(8);
    expect(testedDate.getMinutes()).toBe(45);
    expect(testedDate.getDate()).toBe(21);
    expect(testedDate.getMonth()).toBe(1);
    expect(testedDate.getFullYear()).toBe(2020);
  });
});

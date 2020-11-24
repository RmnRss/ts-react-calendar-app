import { cleanup } from "@testing-library/react";
import React from "react";
import { Calendar } from "../components/Calendar";
import { render } from "./test-utils";

afterEach(cleanup);

describe("Calendar", function () {
  it("renders all days of the week", () => {
    const { getByText } = render(<Calendar />);

    getByText("Monday");
    getByText("Tuesday");
    getByText("Wednesday");
    getByText("Thursday");
    getByText("Friday");
    getByText("Saturday");
    getByText("Sunday");
  });

  it("renders the correct amount of days", () => {
    const { getByTestId } = render(<Calendar />);

    const grid = getByTestId("days-grid");

    expect(
      grid.children.length === 35 || grid.children.length === 42
    ).toBeTruthy();
  });
});

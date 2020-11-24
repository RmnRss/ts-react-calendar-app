import "@testing-library/jest-dom";
import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import { addMonths, addYears, format } from "date-fns";
import React from "react";
import { Header } from "../components/Header";
import { render } from "./test-utils";

afterEach(cleanup);

/**
 * These tests also serves as test for providers and reducers
 * as they use their functionalities and prove they work (or don't)
 */
describe("Header", function () {
  it("renders all elements", () => {
    const { getByTestId, getByAltText } = render(<Header />);

    getByTestId("current-month");
    getByAltText("bongo cat");
    getByAltText("logo");
  });

  it("renders the correct Date", () => {
    const { getByText } = render(<Header />);
    getByText(format(new Date(), "MMMM yyyy"));
  });

  it("updates the displayed date according to the button pressed", async () => {
    const testedDate = new Date();

    const { getByAltText, getByTestId } = render(<Header />);

    const label = getByTestId("current-month");

    expect(label.innerHTML).toBe(format(testedDate, "MMMM yyyy"));

    const nextMonthBtn = getByAltText("next month");
    const nextYearBtn = getByAltText("next year");
    const prevMonthBtn = getByAltText("previous month");
    const prevYearBtn = getByAltText("previous year");

    fireEvent.click(nextMonthBtn);

    // next Month
    await waitFor(() => {
      expect(label.innerHTML).toBe(
        format(addMonths(testedDate, 1), "MMMM yyyy")
      );
    });

    fireEvent.click(prevMonthBtn);

    // prev Month
    await waitFor(() => {
      expect(label.innerHTML).toBe(format(testedDate, "MMMM yyyy"));
    });

    fireEvent.click(nextYearBtn);

    // next year
    await waitFor(() => {
      expect(label.innerHTML).toBe(
        format(addYears(testedDate, 1), "MMMM yyyy")
      );
    });

    fireEvent.click(prevYearBtn);

    // prev year
    await waitFor(() => {
      expect(label.innerHTML).toBe(format(testedDate, "MMMM yyyy"));
    });
  });
});

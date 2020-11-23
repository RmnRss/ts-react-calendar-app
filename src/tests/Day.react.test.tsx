import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Day } from "../components/Day";

describe("Day", function () {
  it("renders correctly", async () => {
    const { getByText } = render(
      <Day
        date={new Date("22 January 2010")}
        isToday={true}
        ofCurrentMonth={false}
        events={[]}
      />
    );

    const dayNumber = getByText("22");

    expect(dayNumber).toBeInstanceOf(HTMLElement);
  });

  it("renders correctly with events", async () => {
    const { getByText } = render(
      <Day
        date={new Date("22 January 2010")}
        isToday={true}
        ofCurrentMonth={false}
        events={[
          {
            id: 4,
            dateTimeStart: new Date(1995, 11, 17, 3, 30, 0),
            dateTimeEnd: new Date(1995, 11, 17, 4, 45, 0),
            title: "Restaurant with friends",
            description: "Meeting at Papa John's Pizza",
          },
          {
            id: 5,
            dateTimeStart: new Date(1995, 11, 17, 6, 30, 0),
            dateTimeEnd: new Date(1995, 11, 17, 7, 30, 0),
            title: "Breakfast with friends",
            description: "Meeting at Papa John's Pizza",
          },
        ]}
      />
    );

    const firstEvent = getByText("Breakfast with friends");
    const secondEvent = getByText("Restaurant with friends");

    expect(firstEvent).toBeInstanceOf(HTMLElement);
    expect(secondEvent).toBeInstanceOf(HTMLElement);
  });

  it("opens a modal on click, with the correct date", async () => {
    const date = new Date("22 March 2014");
    const { getByTestId, getByText } = render(
      <Day date={date} isToday={true} ofCurrentMonth={false} events={[]} />
    );

    const dateEl = getByTestId(`day-${date.toISOString()}`);

    fireEvent.click(dateEl);

    await waitFor(() => {
      getByTestId("overlay");
      getByText("22 March 2014");
    });
  });
});

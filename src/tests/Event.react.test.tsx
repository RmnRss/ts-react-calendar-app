import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Event } from "../components/Event";

describe("Day", function () {
  it("renders correctly", async () => {
    const { getByText } = render(
      <Event
        id={4}
        dateTimeStart={new Date(1995, 11, 17, 3, 30, 0)}
        dateTimeEnd={new Date(1995, 11, 17, 4, 45, 0)}
        title={"Restaurant with friends"}
        description={"Meeting at Papa John's Pizza"}
      />
    );

    getByText("Restaurant with friends");
  });

  it("opens a details popup when clicked", async () => {
    const { getByTestId, getByText } = render(
      <Event
        id={4}
        dateTimeStart={new Date(1995, 11, 17, 3, 30, 0)}
        dateTimeEnd={new Date(1995, 11, 17, 4, 45, 0)}
        title={"Restaurant with friends"}
        description={"Meeting at Papa John's Pizza"}
      />
    );

    const dateEl = getByTestId("event-card");

    fireEvent.click(dateEl);

    await waitFor(() => {
      getByTestId("event-details");
      getByText("Sunday, 17 December 1995");
      getByText("03:30");
      getByText("04:45");
      getByText("Meeting at Papa John's Pizza");
    });
  });
});

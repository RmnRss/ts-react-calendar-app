import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import SidePanel from "../components/SidePanel";

describe("Side Panel", function () {
  it("renders correctly with events", () => {
    const { getByText } = render(
      <SidePanel
        visible={true}
        handleClose={() => {}}
        day={{
          date: new Date(1995, 11, 17),
          events: [
            {
              id: 4,
              dateTimeStart: new Date(1995, 11, 17, 3, 30, 0),
              dateTimeEnd: new Date(1995, 11, 17, 4, 45, 0),
              title: "Restaurant with friends",
              description: "Meeting at Papa John's Pizza",
            },
          ],
        }}
      />
    );

    getByText("Sunday, 17 December 1995");
    getByText("Upcoming Events");
    getByText("Add an Event");
  });

  it("renders correctly without events", () => {
    const { getByText } = render(
      <SidePanel
        visible={true}
        handleClose={() => {}}
        day={{
          date: new Date(1995, 11, 17),
          events: [],
        }}
      />
    );

    getByText("Sunday, 17 December 1995");
    getByText("Upcoming Events");
    getByText("Add an Event");
    getByText("No events for this day");
  });

  it("the close button triggers the handleClose method", async () => {
    let visible = true;

    const { getByAltText } = render(
      <SidePanel
        visible={visible}
        handleClose={() => {
          visible = false;
        }}
        day={{
          date: new Date(1995, 11, 17),
          events: [],
        }}
      />
    );

    const btn = getByAltText("close icon");

    fireEvent.click(btn);

    await waitFor(() => {
      expect(visible).toBe(false);
    });
  });
});

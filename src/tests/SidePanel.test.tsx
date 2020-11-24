import "@testing-library/jest-dom";
import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import { render } from "./test-utils";
import React from "react";
import SidePanel from "../components/SidePanel";

afterEach(cleanup);

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

  it("renders event in chronological order", async () => {
    const { getAllByTestId, rerender } = render(
      <SidePanel
        visible={true}
        handleClose={() => {}}
        day={{
          date: new Date(1995, 11, 17),
          events: [
            {
              id: 4,
              dateTimeStart: new Date(1995, 11, 17, 12, 30, 0),
              dateTimeEnd: new Date(1995, 11, 17, 15, 45, 0),
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
          ],
        }}
      />
    );

    // re-rendering to activate UseEffect
    rerender(
      <SidePanel
        visible={true}
        handleClose={() => {}}
        day={{
          date: new Date(1995, 11, 17),
          events: [
            {
              id: 4,
              dateTimeStart: new Date(1995, 11, 17, 12, 30, 0),
              dateTimeEnd: new Date(1995, 11, 17, 15, 45, 0),
              title: "Restaurant with friends",
              description: "Meeting at Papa John's Pizza",
            },
            {
              id: 7,
              dateTimeStart: new Date(1995, 11, 17, 17, 30, 0),
              dateTimeEnd: new Date(1995, 11, 17, 18, 45, 0),
              title: "Restaurant with Daniel",
              description: "Meeting at FCP",
            },
            {
              id: 5,
              dateTimeStart: new Date(1995, 11, 17, 6, 30, 0),
              dateTimeEnd: new Date(1995, 11, 17, 7, 30, 0),
              title: "Breakfast with friends",
              description: "Meeting at Papa John's Pizza",
            },
          ],
        }}
      />
    );

    await waitFor(() => {
      // getting events in their rendering order
      const events = getAllByTestId("event-card");

      expect(events[0].querySelector("p")?.innerHTML).toBe("06:30 - 07:30");
      expect(events[1].querySelector("p")?.innerHTML).toBe("12:30 - 15:45");
      expect(events[2].querySelector("p")?.innerHTML).toBe("17:30 - 18:45");
    });
  });
});

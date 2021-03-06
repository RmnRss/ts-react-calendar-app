import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Event } from "../components/Event";

afterEach(cleanup);

describe("Event", function () {
  it("renders correctly", () => {
    const { getByText } = render(
      <Event
        id={4}
        dateTimeStart={new Date(1995, 11, 17, 3, 30, 0)}
        dateTimeEnd={new Date(1995, 11, 17, 4, 45, 0)}
        title={"Restaurant with friends"}
        description={"Meeting at Papa John's Pizza"}
      />
    );

    getByText("03:30 - 04:45");
    getByText("Restaurant with friends");
    getByText("Meeting at Papa John's Pizza");
  });

  it("shows the delete button on hover", () => {
    const { getByText, getByTestId } = render(
      <Event
        id={4}
        dateTimeStart={new Date(1995, 11, 17, 3, 30, 0)}
        dateTimeEnd={new Date(1995, 11, 17, 4, 45, 0)}
        title={"Restaurant with friends"}
        description={"Meeting at Papa John's Pizza"}
      />
    );

    const card = getByTestId("event-card");

    fireEvent.mouseOver(card);

    getByText("Delete");
  });
});

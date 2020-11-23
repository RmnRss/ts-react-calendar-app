import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { EventCreationForm } from "../components/EventCreationForm";

afterEach(cleanup);

describe("Event Creation Form", () => {
  it("Validation: Name Required", async () => {
    const { getByText } = render(
      <EventCreationForm date={new Date("21 February 2014")} />
    );

    const btn = getByText("Create Event");

    fireEvent.click(btn);

    await waitFor(() => {
      getByText("The name of the event is required");
    });
  });

  it("Validation: Start date must be later than end date", async () => {
    const { getByText, getByDisplayValue } = render(
      <EventCreationForm date={new Date("21 February 2014")} />
    );

    const btn = getByText("Create Event");
    const start = getByDisplayValue("8:00");
    const end = getByDisplayValue("9:00");

    start.focus();

    fireEvent.change(start, {
      target: {
        value: 8,
      },
    });

    start.blur();

    end.focus();

    fireEvent.change(end, {
      target: {
        value: 7,
      },
    });

    end.blur();

    fireEvent.click(btn);

    await waitFor(() => {
      getByText("An event must end after it started.");
    });
  });

  it("Validation: Max Characters", async () => {
    const { getByText, getByPlaceholderText } = render(
      <EventCreationForm date={new Date("21 February 2014")} />
    );

    const btn = getByText("Create Event");
    const titleInput = getByPlaceholderText("Diner with friends");
    const descriptionInput = getByPlaceholderText(
      "Meeting with John, Lydia and Joe at FBF."
    );

    titleInput.focus();

    fireEvent.change(titleInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nile",
      },
    });

    titleInput.blur();

    descriptionInput.focus();

    fireEvent.change(descriptionInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    });

    descriptionInput.blur();

    fireEvent.click(btn);

    await waitFor(() => {
      getByText("Title must be shorter than 140 characters");
      getByText("Description must contain less than 280 characters");
    });
  });

  it("Reset button clears inputs", async () => {
    const { getByText, getByPlaceholderText } = render(
      <EventCreationForm date={new Date("21 February 2014")} />
    );

    const btn = getByText("Reset");
    const titleInput = getByPlaceholderText("Diner with friends");
    const descriptionInput = getByPlaceholderText(
      "Meeting with John, Lydia and Joe at FBF."
    );

    fireEvent.change(titleInput, {
      target: {
        value: "Hello",
      },
    });

    fireEvent.change(descriptionInput, {
      target: {
        value: "World",
      },
    });

    expect(titleInput.value).toBe("Hello");
    expect(descriptionInput.value).toBe("World");

    fireEvent.click(btn);

    await waitFor(() => {
      expect(titleInput.value).toBe("");
      expect(descriptionInput.value).toBe("");
    });
  });
});

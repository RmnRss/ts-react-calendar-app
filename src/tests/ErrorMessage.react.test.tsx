import { render } from "@testing-library/react";
import React from "react";
import { ErrorMessage } from "../components/inputs/ErrorMessage";

describe("ErrorMessage", function () {
  it("renders correctly", () => {
    const { getByText } = render(<ErrorMessage>Error</ErrorMessage>);

    getByText("Error");
  });
});

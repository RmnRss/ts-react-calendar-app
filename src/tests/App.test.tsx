import { render } from "@testing-library/react";
import React from "react";
import App from "../App";

describe("App", function () {
  it("renders 2 divs", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app-container").children.length).toBe(2);
  });
});

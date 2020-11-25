import React from "react";
import App from "../App";
import { render } from "./test-utils";

describe("App", function () {
  it("renders 2 divs", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app-container").children.length).toBe(2);
  });
});

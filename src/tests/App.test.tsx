import { render } from "@testing-library/react";
import { format } from "date-fns";
import React from "react";
import App from "../App";

test("renders the correct Date", () => {
  const { getByText } = render(<App />);
  getByText(format(new Date(), "MMMM yyyy"));
});

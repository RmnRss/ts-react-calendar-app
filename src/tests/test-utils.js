import { render } from "@testing-library/react";
import React from "react";
import { EventProvider } from "../providers/EventProvider";
import { MonthProvider } from "../providers/MonthProvider";

const AllProviders = ({ children }) => {
  return (
    <EventProvider>
      <MonthProvider>{children}</MonthProvider>
    </EventProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };

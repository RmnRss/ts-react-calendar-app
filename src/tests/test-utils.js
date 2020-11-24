import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

const AllProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };

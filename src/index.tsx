import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { EventProvider } from "./providers/EventProvider";
import { MonthProvider } from "./providers/MonthProvider";
import { GlobalStyle } from "./styles/global";
import Theme from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <EventProvider>
        <MonthProvider>
          <App />
        </MonthProvider>
      </EventProvider>

      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

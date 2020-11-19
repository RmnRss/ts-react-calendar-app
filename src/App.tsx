import React from "react";
import styled from "styled-components";
import { Calendar } from "./components/Calendar";
import { Header } from "./components/Header";
import { createFakeDays, createFakeEvents } from "./services/dates";

const Container = styled.header`
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <Header />
      <Calendar activeMonth={createFakeDays()} events={createFakeEvents()} />
    </Container>
  );
}

export default App;

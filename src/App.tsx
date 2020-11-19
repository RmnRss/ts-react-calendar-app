import React from "react";
import styled from "styled-components";
import { Calendar } from "./components/Calendar";
import { Header } from "./components/Header";
import IEvent from "./types/IEvent";

const Container = styled.header`
  min-height: 100vh;
`;

function createFakeDays(): Array<Date> {
  const days: Array<Date> = [];

  for (let i: number = 0; i < 30; i++) {
    days.push(new Date());
  }

  return days;
}

function createFakeEvents(): Array<IEvent> {
  const ev: Array<IEvent> = [];

  for (let i: number = 0; i < 2; i++) {
    ev.push({
      id: i,
      dateTimeStart: new Date(2020, 10, 19, 14, 2, 0, 0),
      dateTimeEnd: new Date(2020, 10, 19, 15, 2, 0, 0),
      title: "event",
      description: "this is an event",
    });
  }

  return ev;
}

function App() {
  return (
    <Container>
      <Header />
      <Calendar activeMonth={createFakeDays()} events={createFakeEvents()} />
    </Container>
  );
}

export default App;

import React from "react";
import styled from "styled-components";
import IEvent from "../types/IEvent";
import { Event } from "./Event";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  justify-content: flex-start;
  text-align: center;

  padding: 1.5rem;

  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.greyDark};
  border-radius: ${(props) => props.theme.radius};

  color: ${(props) => props.theme.light};

  &:hover {
    cursor: pointer;
  }
`;

const EventsHolder = styled.div`
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-content: flex-end;
  text-align: center;

  height: 100%;
  width: 100%;
`;

interface Props {
  date: Date;
  events?: Array<IEvent>;
}

export const Day: React.FC<Props> = ({ date, events = [] }) => {
  return (
    <Container>
      <p>9</p>
      <EventsHolder>
        {events?.map((e) => (
          <Event
            key={e.id}
            dateTimeStart={e.dateTimeStart}
            dateTimeEnd={e.dateTimeEnd}
            title={e.title}
            description={e.description}
          />
        ))}
      </EventsHolder>
    </Container>
  );
};

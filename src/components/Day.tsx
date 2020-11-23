import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../hooks/useModal";
import IEvent from "../types/IEvent";
import { Event } from "./Event";
import { EventCreationForm } from "./EventCreationForm";
import Modal from "./Modal";

interface ContainerProps {
  isToday: boolean;
  ofCurrentMonth: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  justify-content: flex-start;
  text-align: center;

  padding: 1.5rem;

  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.isToday ? props.theme.secondary : props.theme.greyDark};
  border-radius: ${(props) => props.theme.radius};

  color: ${(props) => props.theme.light};

  opacity: ${(props) => (props.ofCurrentMonth ? "1" : "0.5")};

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
  isToday: boolean;
  ofCurrentMonth: boolean;
}

export const Day: React.FC<Props> = ({
  date,
  events = [],
  isToday,
  ofCurrentMonth,
}) => {
  const { show, toggle } = useModal();
  const [currentEvents, setCurrentEvents] = useState(events);

  const createEvent = (newEvent: IEvent) => {
    setCurrentEvents([newEvent, ...currentEvents]);
    alert("New Event Created !");
    toggle();
  };

  return (
    <>
      <Modal title={"Add an event"} show={show} handleClose={toggle}>
        <p>{format(date, "dd MMMM yyyy")}</p>
        <EventCreationForm date={date} createEvent={createEvent} />
      </Modal>

      <Container
        data-testid={`day-${date.toISOString()}`}
        isToday={isToday}
        ofCurrentMonth={ofCurrentMonth}
        onClick={() => toggle()}
      >
        <p>{date.getDate()}</p>
        <EventsHolder>
          {currentEvents?.map((e) => (
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
    </>
  );
};

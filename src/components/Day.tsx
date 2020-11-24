import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../hooks/useModal";
import IEvent from "../types/IEvent";
import { EventCreationForm } from "./EventCreationForm";
import Modal from "./Modal";
import SidePanel from "./SidePanel";

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
    props.isToday ? props.theme.secondary : props.theme.grey};
  border-radius: ${(props) => props.theme.radius};

  color: ${(props) => props.theme.light};

  opacity: ${(props) => (props.ofCurrentMonth ? "1" : "0.5")};

  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(101, 98, 252, 0.75);
  }
`;

const EventsIndicator = styled.div`
  margin: auto 0 0 0;

  height: 16px;
  width: 16px;

  border-radius: 50%;
  background-color: ${(props) => props.theme.orange};
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
  const [showPanel, setShowPanel] = useState(false);

  const togglePanelOrModal = () => {
    if (events.length > 0) {
      setShowPanel(true);
    } else {
      toggle();
    }
  };

  return (
    <>
      <Modal title={"Create an Event"} show={show} handleClose={toggle}>
        <p>{format(date, "dd MMMM yyyy")}</p>
        <EventCreationForm date={date} onEventCreation={() => toggle()} />
      </Modal>

      <SidePanel
        visible={showPanel}
        handleClose={() => setShowPanel(false)}
        day={{ date, events }}
      />

      <Container
        data-testid={`day-${date.toISOString()}`}
        isToday={isToday}
        ofCurrentMonth={ofCurrentMonth}
        onClick={() => togglePanelOrModal()}
      >
        <p>{date.getDate()}</p>
        {events.length > 0 && (
          <EventsIndicator data-testid={"has-event-indicator"} />
        )}
      </Container>
    </>
  );
};

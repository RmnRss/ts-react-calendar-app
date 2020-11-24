import { format, isBefore } from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import close from "../assets/icons/close.svg";
import { useModal } from "../hooks/useModal";
import IDay from "../types/IDay";
import breakpoints from "../utils/breakpoints";
import { Button } from "./Button";
import { Event } from "./Event";
import { EventCreationForm } from "./EventCreationForm";
import Modal from "./Modal";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Panel = styled(Column)`
  position: fixed;
  z-index: 1;
  right: 0%;
  top: 0%;

  padding: 5rem 1.5rem;

  height: 100vh;
  max-width: 100%;

  width: 512px;
  max-width: 33%;

  background-color: ${(props) => props.theme.grey};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);

  @media screen and (max-width: ${breakpoints.md}px) {
    width: 100vw;
    max-width: 100%;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin: 0 0 1.5rem 0;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;

  margin: 0 0 0 auto;

  cursor: pointer;
`;

const PanelContent = styled.div`
  width: 100%;
  height: 100%;

  margin: 0.5rem 0;

  overflow: auto;

  @media screen and (max-width: ${breakpoints.md}px) {
    max-height: 100%;
  }
`;

const AddButton = styled(Button)`
  && {
    width: 100%;
    margin: 1rem 0;
  }
`;

interface Props {
  day: IDay;
  handleClose: () => void;
  visible: boolean;
}

const SidePanel: React.FC<Props> = ({ day, handleClose, visible }) => {
  const { show, toggle } = useModal();
  const [events, setEvents] = useState(day.events);

  useEffect(() => {
    let tempEvents = day.events;
    tempEvents?.sort((a, b) => {
      if (isBefore(a.dateTimeStart, b.dateTimeStart)) {
        return -1;
      } else {
        return 1;
      }
    });
    setEvents(tempEvents);
  }, [day]);

  return (
    <>
      <Modal title={"Create an Event"} show={show} handleClose={toggle}>
        <p>{format(day.date, "dd MMMM yyyy")}</p>
        <EventCreationForm date={day.date} onEventCreation={() => toggle()} />
      </Modal>

      {visible ? (
        <Panel data-testid={"side-panel"}>
          <PanelHeader>
            <h3>{format(day.date, "EEEE, dd MMMM yyyy")}</h3>
            <CloseIcon
              src={close}
              alt={"close icon"}
              onClick={() => handleClose()}
            />
          </PanelHeader>

          <PanelContent>
            <h4>Upcoming Events</h4>

            {events && events.length > 0 ? (
              events?.map((e) => (
                <Event
                  key={e.id}
                  id={e.id}
                  dateTimeStart={e.dateTimeStart}
                  dateTimeEnd={e.dateTimeEnd}
                  title={e.title}
                  description={e.description}
                />
              ))
            ) : (
              <p>No events for this day</p>
            )}

            <AddButton color={"primary"} onClick={() => toggle()}>
              Add an Event
            </AddButton>
          </PanelContent>
        </Panel>
      ) : null}
    </>
  );
};

export default SidePanel;

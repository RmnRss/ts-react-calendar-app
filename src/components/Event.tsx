import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import close from "../assets/icons/close.svg";
import { useEvents } from "../providers/EventProvider";
import { Button } from "./Button";

const EventCard = styled.div`
  width: 100%;

  padding: 0.25rem;
  margin: 0 0 0.5rem 0;

  border-radius: 2px;

  overflow: hidden;

  background-color: ${(props) => props.theme.primary};
`;

const DetailsBoxHolder = styled.div`
  position: relative;

  width: 100%;
`;

const DetailsBox = styled.div`
  position: absolute;
  top: 0;
  left: 0%;

  z-index: 2;

  display: flex;
  flex-direction: column;
  text-align: left;

  height: max-content;
  width: max-content;
  max-width: 320px;

  padding: 1.5rem;

  border-radius: ${(props) => props.theme.radius};

  background-color: ${(props) => props.theme.dark};

  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);

  cursor: default;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100%;
  }
`;

const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin: 0 0 1rem 0;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;

  margin: 0 0 0 auto;

  cursor: pointer;
`;

const Description = styled.p`
  width: 100%;

  padding: 1rem;
  margin: 1rem 0;

  border: 1px solid ${(props) => props.theme.grey};
  border-radius: ${(props) => props.theme.radius};
`;

const RemoveButton = styled(Button)`
  justify-self: flex-end;
  align-self: flex-end;

  margin: 1rem 0 0 0;
`;

interface Props {
  id: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  title: string;
  description?: string;
}

export const Event: React.FC<Props> = ({
  id,
  dateTimeStart,
  dateTimeEnd,
  title,
  description,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { removeEvent } = useEvents();

  function showTime(date: Date): string {
    return format(date, "HH:mm");
  }

  const toggle = () => {
    setShowDetails(!showDetails);
  };

  const preventPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <>
      <EventCard
        data-testid={"event-card"}
        onClick={(event) => {
          preventPropagation(event);
          toggle();
        }}
      >
        <b>{title}</b>
      </EventCard>

      <DetailsBoxHolder data-testid={"event-details"} tabIndex={-1}>
        {showDetails && (
          <DetailsBox title={"Details"}>
            <BoxHeader>
              <h3>{title}</h3>
              <CloseIcon
                src={close}
                onClick={(event) => {
                  preventPropagation(event);
                  toggle();
                }}
              />
            </BoxHeader>
            <p>{format(dateTimeStart, "EEEE, dd MMMM yyyy")}</p>
            <p>
              <b>{showTime(dateTimeStart)}</b> to <b>{showTime(dateTimeEnd)}</b>
            </p>
            {description && <Description>{description}</Description>}

            <RemoveButton
              color={"fail"}
              onClick={(event) => {
                preventPropagation(event);
                removeEvent(id);
              }}
            >
              Delete Event
            </RemoveButton>
          </DetailsBox>
        )}
      </DetailsBoxHolder>
    </>
  );
};

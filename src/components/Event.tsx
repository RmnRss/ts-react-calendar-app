import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { useEvents } from "../providers/EventProvider";
import { Button } from "./Button";

const EventCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: left;

  height: max-content;
  width: 100%;

  margin: 1rem 0;
  padding: 1.5rem;

  border-radius: ${(props) => props.theme.radius};

  background-color: ${(props) => props.theme.darkLight};

  cursor: default;
`;

const Title = styled.b`
  text-transform: capitalize;
  margin: 0 0 0.25rem 0;
`;

const Separator = styled.div`
  display: block;

  width: 32px;
  height: 1px;

  margin: 1rem 0;

  background-color: ${(props) => props.theme.light};
`;

const RemoveButton = styled(Button)`
  && {
    display: none;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    margin: 0 0 0 0;

    ${EventCard}:hover & {
      display: flex;
    }
  }

  justify-self: flex-end;
  align-self: flex-end;
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
  const { removeEvent } = useEvents();

  function showTime(date: Date): string {
    return format(date, "HH:mm");
  }

  return (
    <EventCard data-testid={"event-card"}>
      <Title>{title}</Title>
      <p>
        {showTime(dateTimeStart)} - {showTime(dateTimeEnd)}
      </p>
      {description && (
        <>
          <Separator />
          <p>{description}</p>
        </>
      )}

      <RemoveButton color={"fail"} onClick={() => removeEvent(id)}>
        Delete
      </RemoveButton>
    </EventCard>
  );
};

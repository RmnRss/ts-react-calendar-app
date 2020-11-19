import React from "react";
import styled from "styled-components";

const EventCard = styled.div`
  padding: 0.25rem;

  border-radius: 2px;
  margin: 0 0 0.5rem 0;

  background-color: ${(props) => props.theme.primary};
`;

interface Props {
  id?: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  title: string;
  description: string;
}

export const Event: React.FC<Props> = ({
  id,
  dateTimeStart,
  dateTimeEnd,
  title,
  description,
}) => {
  return (
    <EventCard>
      <b>{title}</b>
    </EventCard>
  );
};

import { isSameDay, isSameMonth, isToday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import { getAllWeeksOfMonth } from "../services/dates";
import IEvent from "../types/IEvent";
import breakpoints from "../utils/breakpoints";
import { Day } from "./Day";

const Container = styled.div`
  padding: 5rem 1.5rem;

  color: ${(props) => props.theme.light};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;

  width: 100%;
`;

const DaysHeader = styled(Grid)`
  grid-template-rows: 1fr;

  height: 2rem;

  padding: 0 0 1rem 0;

  text-align: center;
  align-items: center;
  justify-items: center;
`;

const DayOfTheWeek = styled.p`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: string(".");

  @media screen and (max-width: ${breakpoints.md}px) {
    max-width: 2ch;
  }
`;

interface DaysGridProps {
  offsetTop: number;
}

const DaysGrid = styled(Grid)<DaysGridProps>`
  grid-template-rows: repeat(6, 1fr);

  // 100 vh - elements size on top - 2*5rem padding
  height: calc(100vh - ${(props) => props.offsetTop}px - 10rem);
  max-height: 100%;

  border-radius: ${(props) => props.theme.radius};

  color: ${(props) => props.theme.light};
`;

interface Props {}

export const Calendar: React.FC<Props> = () => {
  // Visual variables
  const daysHeaderRef = useRef<HTMLDivElement>(null);
  const headerElement: HTMLElement | null = document.getElementById("header");
  const [offsetTop, setOffsetTop] = useState(32);

  // State & Providers
  const [calendarDays, setCalendarDays] = useState<Array<Date>>([]);
  const activeMonth = useSelector((state: RootState) => state.month);
  const events = useSelector((state: RootState) => state.events);

  /**
   * Calculating offsetTop
   */
  useEffect(() => {
    const daysHeaderEl = daysHeaderRef?.current;

    if (null !== daysHeaderEl) {
      setOffsetTop(
        headerElement?.offsetHeight ? +daysHeaderEl.offsetHeight : Number
      );
    }

    setCalendarDays(getAllWeeksOfMonth(activeMonth));
  }, [daysHeaderRef, headerElement, activeMonth]);

  return (
    <Container>
      <DaysHeader ref={daysHeaderRef}>
        <DayOfTheWeek>Monday</DayOfTheWeek>
        <DayOfTheWeek>Tuesday</DayOfTheWeek>
        <DayOfTheWeek>Wednesday</DayOfTheWeek>
        <DayOfTheWeek>Thursday</DayOfTheWeek>
        <DayOfTheWeek>Friday</DayOfTheWeek>
        <DayOfTheWeek>Saturday</DayOfTheWeek>
        <DayOfTheWeek>Sunday</DayOfTheWeek>
      </DaysHeader>

      <DaysGrid data-testid={"days-grid"} offsetTop={offsetTop}>
        {calendarDays.map((day: Date) => {
          const eventsOfTheDay: Array<IEvent> = events.reduce(function (
            result: Array<IEvent>,
            event: IEvent
          ) {
            if (isSameDay(event.dateTimeStart, day)) {
              result.push(event);
            }
            return result;
          },
          []);

          return (
            <Day
              key={day.toISOString()}
              date={day}
              events={eventsOfTheDay}
              isToday={isToday(day)}
              ofCurrentMonth={isSameMonth(day, activeMonth)}
            />
          );
        })}
      </DaysGrid>
    </Container>
  );
};

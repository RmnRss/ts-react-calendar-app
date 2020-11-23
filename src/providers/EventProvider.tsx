import React, { createContext, useContext, useReducer } from "react";
import IEvent from "../types/IEvent";

const EventContext = createContext({
  events: [] as IEvent[],
  addEvent: (event: IEvent) => {},
  removeEvent: (eventId: number) => {},
});

type Actions =
  | { type: "add"; newEvent: IEvent }
  | { type: "remove"; eventId: number };

function reducer(state: Array<IEvent>, action: Actions) {
  switch (action.type) {
    case "add":
      return [action.newEvent, ...state];
    case "remove":
      return state.filter((anEvent) => anEvent.id !== action.eventId);
    default:
      throw new Error();
  }
}

interface Props {
  children: React.ReactNode;
}

export const EventProvider: React.FC<Props> = ({ children }) => {
  const [events, dispatch] = useReducer(reducer, []);

  const addEvent = (event: IEvent): void => {
    dispatch({ type: "add", newEvent: event });
    alert(`New event ${event.title} created !`);
  };

  const removeEvent = (eventId: number): void => {
    dispatch({ type: "remove", eventId });
    alert(`event ${eventId} was removed.`);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        removeEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useDates must be used within an DateProvider");
  }
  return context;
}

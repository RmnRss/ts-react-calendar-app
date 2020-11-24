import IEvent from "../types/IEvent";

type EventsAction =
  | { type: "ADD_EVENT"; newEvent: IEvent }
  | { type: "REMOVE_EVENT"; eventId: number };

function eventsReducer(state: Array<IEvent> = [], action: EventsAction) {
  switch (action.type) {
    case "ADD_EVENT":
      return [action.newEvent, ...state];
    case "REMOVE_EVENT":
      return state.filter((anEvent) => anEvent.id !== action.eventId);
    default:
      return state;
  }
}

export default eventsReducer;

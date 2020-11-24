import { addMonths, addYears, subMonths, subYears } from "date-fns";

type MonthAction =
  | { type: "NEXT_YEAR" }
  | { type: "PREVIOUS_YEAR" }
  | { type: "NEXT_MONTH" }
  | { type: "PREVIOUS_MONTH" };

function monthReducer(state: Date = new Date(), action: MonthAction) {
  switch (action.type) {
    case "NEXT_YEAR":
      return addYears(state, 1);
    case "PREVIOUS_YEAR":
      return subYears(state, 1);
    case "NEXT_MONTH":
      return addMonths(state, 1);
    case "PREVIOUS_MONTH":
      return subMonths(state, 1);
    default:
      return state;
  }
}

export default monthReducer;

import { addMonths, addYears, subMonths, subYears } from "date-fns";
import React, { createContext, useContext, useReducer } from "react";

const DateContext = createContext({
  month: new Date(),
  nextYear: () => {},
  previousYear: () => {},
  nextMonth: () => {},
  previousMonth: () => {},
});

type Actions =
  | { type: "nextYear" }
  | { type: "previousYear" }
  | { type: "nextMonth" }
  | { type: "previousMonth" };

function reducer(state: Date, action: Actions) {
  switch (action.type) {
    case "nextYear":
      return addYears(state, 1);
    case "previousYear":
      return subYears(state, 1);
    case "nextMonth":
      return addMonths(state, 1);
    case "previousMonth":
      return subMonths(state, 1);
    default:
      throw new Error();
  }
}

interface Props {
  children: React.ReactNode;
}

export const MonthProvider: React.FC<Props> = ({ children }) => {
  const [month, dispatch] = useReducer(reducer, new Date());

  const nextMonth = (): void => {
    dispatch({ type: "nextMonth" });
  };

  const previousMonth = (): void => {
    dispatch({ type: "previousMonth" });
  };

  const nextYear = (): void => {
    dispatch({ type: "nextYear" });
  };

  const previousYear = (): void => {
    dispatch({ type: "previousYear" });
  };

  return (
    <DateContext.Provider
      value={{ month, nextYear, previousYear, nextMonth, previousMonth }}
    >
      {children}
    </DateContext.Provider>
  );
};

export function useMonth() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDates must be used within an DateProvider");
  }
  return context;
}

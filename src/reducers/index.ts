import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import monthReducer from "./monthReducer";

/**
 * Simple file gathering reducers to keep the main index js clean
 * and also simplify reducers name
 */

const allReducers = combineReducers({
  events: eventsReducer,
  month: monthReducer,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;

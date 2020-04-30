import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { countryReducer } from "../reducers/countries";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/actions";
import { slotReducer } from "../reducers/slots";

export const rootReducer = combineReducers({
  countries: countryReducer,
  slots: slotReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
    composeEnhancers()
  )
);

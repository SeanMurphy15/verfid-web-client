import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import * as Animal from "./Animal";
import * as Animals from "./Animals";

import * as Business from "./Business";
import * as Businesses from "./Businesses";

import * as Privacy from "./Privacy";


export default function configureStore() {
  const reducers = {
    animal: Animal.reducer,
    animals: Animals.reducer,
    business: Business.reducer,
    businesses: Businesses.reducer,
    privacy: Privacy.reducer
  };

  const middleware = [thunk];

  const rootReducer = combineReducers({
    ...reducers
  });

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
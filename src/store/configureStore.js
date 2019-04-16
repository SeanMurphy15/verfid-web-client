import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import * as Animal from "./Animal";
import * as Animals from "./Animals";

import * as Businesses from "./Businesses";

import * as Certificates from "./Certificates";
import * as Vaccinations from "./Vaccinations";
import * as Forms from "./Forms";

export default function configureStore() {
  const reducers = {
    animal: Animal.reducer,
    animals: Animals.reducer,
    businesses: Businesses.reducer,
    forms: Forms.reducer,
    certificates: Certificates.reducer,
    vaccinations: Vaccinations.reducer
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
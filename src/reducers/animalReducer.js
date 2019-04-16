import initialState from './initialState';
import {FETCH_ANIMALS, RECEIVE_ALL_ANIMALS, RECEIVE_ANIMAL_BY_ID, RECEIVE_ANIMALS_BY_USER_ID, RECEIVE_ANIMAL_CERTIFICATES, RECEIVE_ANIMAL_VACCINATIONS, RECEIVE_ANIMAL_FORMS} from '../actions/actionTypes';

export function animals(state = initialState.animals, action) {
  let newState;
  switch (action.type) {
    case FETCH_ANIMALS:
      console.log('FETCH_ANIMALS Action')
      return action;
    case RECEIVE_ALL_ANIMALS:
      newState = action.animals;
      console.log('RECEIVE_ANIMALS Action')
      return newState;
      case RECEIVE_ANIMALS_BY_USER_ID:
      newState = action.animals;
      console.log('RECEIVE_ANIMALS_BY_USER_ID Action')
      return newState;
    default:
      return state;
  }
}

export function animal(state = initialState.animal, action) {
  let newState;
  switch (action.type) {
      case RECEIVE_ANIMAL_BY_ID:
      newState = action.animal;
      console.log('RECEIVE_ANIMAL_BY_ID Action')
      return newState;
      case RECEIVE_ANIMAL_CERTIFICATES:
      newState = state;
      newState["certificates"] = action.certificates
      console.log('RECEIVE_ANIMAL_CERTIFICATES')
      return newState;
      case RECEIVE_ANIMAL_VACCINATIONS:
      newState = state;
      newState["vaccinations"] = action.vaccinations
      console.log('RECEIVE_ANIMAL_VACCINATIONS')
      return newState;
      case RECEIVE_ANIMAL_FORMS:
      newState = state;
      newState["forms"] = action.forms
      console.log('RECEIVE_ANIMAL_FORMS')
      return newState;
    default:
      return state;
  }
}
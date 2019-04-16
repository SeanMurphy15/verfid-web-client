import initialState from './initialState';
import {RECEIVE_ALL_VACCINATIONS} from '../actions/actionTypes';

export default function vaccinations(state = initialState.vaccinations, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_VACCINATIONS:
      newState = action.vaccinations;
      console.log('RECEIVE_ALL_VACCINATIONS Action')
      return newState;
    default:
      return state;
  }
}
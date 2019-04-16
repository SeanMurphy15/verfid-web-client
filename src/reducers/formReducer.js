import initialState from './initialState';
import {RECEIVE_ALL_FORMS} from '../actions/actionTypes';

export default function forms(state = initialState.forms, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_FORMS:
      newState = action.forms;
      console.log('RECEIVE_ALL_FORMS Action')
      return newState;
    default:
      return state;
  }
}
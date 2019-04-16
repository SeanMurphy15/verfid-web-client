import initialState from './initialState';
import {RECEIVE_ALL_CERTIFICATES} from '../actions/actionTypes';

export default function certificates(state = initialState.certificates, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_CERTIFICATES:
      newState = action.certificates;
      console.log('RECEIVE_ALL_CERTIFICATES Action')
      return newState;
    default:
      return state;
  }
}
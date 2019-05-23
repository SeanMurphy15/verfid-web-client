

import firebase from '../firebase';
import { Promise } from 'q';

const database = firebase.firestore();
const storage = firebase.storage();

const policyReference = storage.refFromURL("https://firebasestorage.googleapis.com/v0/b/verfid-services-database-dev.appspot.com/o/verfid%2Fverfid-privacy-policy.md?alt=media&token=c039c675-b3ed-45be-9bbc-6ddea6a10d89")

const requestPrivacyReference = "REQUEST_PRIVACY_REFERENCE";
const receivePrivacyReference = "RECEIVE_PRIVACY_REFERENCE";
const errorPrivacyReference = "ERROR_PRIVACY_REFERENCE";

const initialState = {
  isLoading: false,
  value: null,
  isError: false,
  errorMessage: null
};

export const fetchPrivacyReferenceAction = () => (

  dispatch => {

    dispatch({
      type: requestPrivacyReference,
      payload: {
        isLoading: true
      }
    });
    database.collection("references").doc("privacy").get()
      .then(response => {
        if (response.exists) {
          var reference = response.data();
          dispatch({
            type: receivePrivacyReference,
            payload: {
              isLoading: false,
              value: reference
            }
          });
        } else {
          dispatch({
            type: receivePrivacyReference,
            payload: {
              isLoading: false,
              isError: true,
              errorMessage: `Privacy content not found.`
            }
          });
        }
      })
      .catch(error => {
        dispatch({
          type: errorPrivacyReference,
          payload: {
            isLoading: false,
            isError: true,
            errorMessage: `${error.error} ${error.message}`
          }
        });
      });
  }
)



export const reducer = (state, action) => {
  var newState = state || initialState;
  switch (action.type) {

    case requestPrivacyReference:
    case receivePrivacyReference:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorPrivacyReference:
      newState = state;
      return Object.assign({}, newState, action.payload);

    default:
      return newState;
  }
};


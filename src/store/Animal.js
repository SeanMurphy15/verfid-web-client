 import firebase from '../firebase';

 const database = firebase.firestore();


const requestAnimal = "REQUEST_ANIMAL";
const receiveAnimal = "RECEIVE_ANIMAL";
const errorAnimal = "ERROR_ANIMAL";

const initialState = {
  isLoading: false,
  value: null,
  isError: false,
  errorMessage: null
};

export const actionCreators = {
  getAnimalById: (id) => async dispatch => {
    dispatch({
      type: requestAnimal,
      payload: {
        isLoading: true,
        value: null
      }
    });
    database.collection("animals").doc(id).get().then(response => {
      if (response.exists) {
        var data = response.data();
            data["id"] = response.id;
        dispatch({
          type: receiveAnimal,
          payload: {
            isLoading: false,
            value: data
          }
        });
    } else {
      dispatch({
        type: receiveAnimal,
        payload: {
          isLoading: false,
          isError: true,
          errorMessage: `Animal not found.`
        }
      });
    }
      })
      .catch(error => {        
        dispatch({
          type: errorAnimal,
          payload: {
            isLoading: false,
            isError: true,
            errorMessage: `${error.error} ${error.message}`
          }
        });
      });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case requestAnimal:
    case receiveAnimal:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        value : action.payload.value
      };
    case errorAnimal:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};
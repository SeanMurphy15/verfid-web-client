import firebase from '../firebase';

const database = firebase.firestore();


const requestBusiness = "REQUEST_BUSINESS";
const receiveBusiness = "RECEIVE_BUSINESS";
const errorBusiness = "ERROR_BUSINESS";

const initialState = {
 isLoading: false,
 value: null,
 isError: false,
 errorMessage: null
};

export const actionCreators = {
 getBusinessById: (id) => async dispatch => {
   dispatch({
     type: requestBusiness,
     payload: {
       isLoading: true,
       value: null
     }
   });
   database.collection("businesses").doc(id).get().then(response => {
     if (response.exists) {
       var data = response.data();
           data["id"] = response.id;
       dispatch({
         type: receiveBusiness,
         payload: {
           isLoading: false,
           value: data
         }
       });
   } else {
     dispatch({
       type: receiveBusiness,
       payload: {
         isLoading: false,
         isError: true,
         errorMessage: `Business not found.`
       }
     });
   }
     })
     .catch(error => {        
       dispatch({
         type: errorBusiness,
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
   case requestBusiness:
   case receiveBusiness:
     return {
       ...state,
       isLoading: action.payload.isLoading,
       value : action.payload.value
     };
   case errorBusiness:
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
import firebase from '../firebase';

const database = firebase.firestore();


const requestBusinessRequirement = "REQUEST_BUSINESS_REQUIREMENT";
const receiveBusinessRequirement = "RECEIVE_BUSINESS_REQUIREMENT";
const errorBusinessRequirement = "ERROR_BUSINESS_REQUIREMENT";

const initialState = {
 isLoading: false,
 value: null,
 isError: false,
 errorMessage: null
};

export const actionCreators = {
 getBusinessRequirementById: (id) => async dispatch => {
   dispatch({
     type: requestBusinessrequirement,
     payload: {
       isLoading: true,
       value: null
     }
   });
   database.collection("businesses").doc(id).collection("requirement").get().then(businessReqResponse => {
    if (businessReqResponse.empty == false) {
        var data = businessReqResponse.docs
        dispatch({
            type: receiveBusinessRequirement,
            payload: {
                isLoading: false,
                isError: false,
                value: data
            }
        });
    } else {
        dispatch({
            type: receiveBusinessRequirement,
            payload: {
                isLoading: false,
                isError: false,
                errorMessage: `Business requirement not found.`
            }
        });
    }
}).catch(error => {        
       dispatch({
         type: errorBusinessRequirement,
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
   case requestBusinessRequirement:
   case receiveBusinessRequirement:
     return {
       ...state,
       isLoading: action.payload.isLoading,
       value : action.payload.value
     };
   case errorBusinessRequirement:
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
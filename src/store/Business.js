import firebase from '../firebase';

const database = firebase.firestore();


const requestBusinessById = "REQUEST_BUSINESS_BY_ID";
const receiveBusinessById = "RECEIVE_BUSINESS_BY_ID";
const errorBusinessById = "ERROR_BUSINESS_BY_ID";

const requestBusinessRequirementsById = "REQUEST_BUSINESS_REQUIREMENTS_BY_ID";
const receiveBusinessRequirementsById = "RECEIVE_BUSINESS_REQUIREMENTS_BY_ID";
const errorBusinessRequirementsById = "ERROR_BUSINESS_REQUIREMENTS_BY_ID";

const initialState = {
 isLoading: false,
 value: null,
 isError: false,
 errorMessage: null
};

export const actionCreators = {
 getBusinessById: (id) => async dispatch => {
   dispatch({
     type: requestBusinessById,
     payload: {
       isLoading: true,
     }
   });
   database.collection("businesses").doc(id).get().then(response => {
     if (response.exists) {
       var data = response.data();
           data["id"] = response.id;
       dispatch({
         type: receiveBusinessById,
         payload: {
           isLoading: false, 
           value: data
         }
       });
   } else {
     dispatch({
       type: receiveBusinessById,
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
         type: errorBusinessById,
         payload: {
           isLoading: false,
           isError: true,
           errorMessage: `${error.error} ${error.message}`
         }
       });
     });
 },
 getBusinessRequirementById: (id) => async dispatch => {
  dispatch({
    type: requestBusinessRequirementsById,
    payload: {
      isLoading: true
    }
  });
  database.collection("businesses").doc(id).collection("requirements").get().then(response => {
    if (response.empty == false) {
      var dataArray = [];
      response.docs.forEach(doc => {
          var data = doc.data();
          data["id"] = doc.id;
          dataArray.push(data)
      });
      dispatch({
          type: receiveBusinessRequirementsById,
          payload: {
              isLoading: false, 
              requirements: dataArray
          }
      });
  } else {
      dispatch({
          type: receiveBusinessRequirementsById,
          payload: {
              isLoading: false,
              isError: false,
              errorMessage: `Animals not found.`
          }
      });
  }
}).catch(error => {        
      dispatch({
        type: errorBusinessRequirementsById,
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
 var newState = state || initialState;
 switch (action.type) {
   case requestBusinessById:
   case receiveBusinessById:
   newState = state;
   return Object.assign(newState, action.payload);
   case errorBusinessById:
   newState = state;
   return Object.assign(newState, action.payload);
     case requestBusinessRequirementsById:
     newState = state;
     return Object.assign(newState, action.payload);
     case receiveBusinessRequirementsById:
     newState = state;
     return Object.assign(newState, action.payload);
     case errorBusinessRequirementsById:
     newState = state;
     return Object.assign(newState, action.payload);
   default:
     return newState;
 }
};
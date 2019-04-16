import firebase from '../firebase';

const database = firebase.firestore();

const requestBusinesses = "REQUEST_BUSINESSES";
const receiveBusinesses = "RECEIVE_BUSINESSES";
const errorBusinesses = "ERROR_BUSINESSES";

const initialState = {
    isLoading: false,
    dataType: "business",
    value: [],
    isError: false,
    errorMessage: null
};

export const actionCreators = {
    getBusinesses: () => async dispatch => {
        dispatch({
            type: requestBusinesses,
            payload: {
                isLoading: true,
                value: null
            }
        });
        database.collection("businesses").get().then(response => {
            if (response.empty == false) {
                var dataArray = [];
                response.docs.forEach(doc => {
                    var data = doc.data();
                    data["id"] = doc.id;
                    dataArray.push(data)
                });
                dispatch({
                    type: receiveBusinesses,
                    payload: {
                        isLoading: false,
                        value: dataArray
                    }
                });
            } else {
                dispatch({
                    type: receiveBusinesses,
                    payload: {
                        isLoading: false,
                        isError: false,
                        errorMessage: `Businesses not found.`
                    }
                });
            }
        })
            .catch(error => {
                dispatch({
                    type: errorBusinesses,
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
        case requestBusinesses:
        case receiveBusinesses:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorBusinesses:
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
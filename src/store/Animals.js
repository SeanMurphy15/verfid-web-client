import firebase from '../firebase';

const database = firebase.firestore();

const requestAnimals = "REQUEST_ANIMALS";
const receiveAnimals = "RECEIVE_ANIMALS";
const errorAnimals = "ERROR_ANIMALS";

const initialState = {
    isLoading: false,
    dataType: "animal",
    value: [],
    isError: false,
    errorMessage: null
};

export const actionCreators = {
    getAnimalsByUserId: (id) => async dispatch => {
        dispatch({
            type: requestAnimals,
            payload: {
                isLoading: true,
                value: null
            }
        });
        database.collection("animals").where("userId", "==", id).get().then(response => {
            if (response.empty == false) {
                var dataArray = [];
                response.docs.forEach(doc => {
                    var data = doc.data();
                    data["id"] = doc.id;
                    dataArray.push(data)
                });
                dispatch({
                    type: receiveAnimals,
                    payload: {
                        isLoading: false,
                        value: dataArray
                    }
                });
            } else {
                dispatch({
                    type: receiveAnimals,
                    payload: {
                        isLoading: false,
                        isError: false,
                        errorMessage: `Animals not found.`
                    }
                });
            }
        })
            .catch(error => {
                dispatch({
                    type: errorAnimals,
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
        case requestAnimals:
        case receiveAnimals:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorAnimals:
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
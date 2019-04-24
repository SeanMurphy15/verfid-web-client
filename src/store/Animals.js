import firebase from '../firebase';
import { Promise } from 'q';

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

export const fetchAnimalsByUserIdAction = (id) => (

    dispatch => {
        dispatch({
            type: requestAnimals,
            payload: {
                isLoading: true,
            }
        });
        fetchAnimalsByUserId(id).then(animal=>{
            dispatch(animal)
        })
    }
)

export function fetchAnimalsByUserId(id){

    let promise = new Promise(function (resolve, reject) {

    database.collection("animals").where("userId", "==", id).get().then(response => {
        if (response.empty == false) {
            var dataArray = [];
            response.docs.forEach(doc => {
                var data = doc.data();
                data["id"] = doc.id;
                dataArray.push(data)
            });
            resolve({
                type: receiveAnimals,
                payload: {
                    isLoading: false,
                    value: dataArray
                }
            });
        } else {
            resolve({
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
            resolve({
                type: errorAnimals,
                payload: {
                    isLoading: false,
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    })
    return promise
}

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
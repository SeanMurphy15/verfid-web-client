import firebase from '../firebase';

const database = firebase.firestore();

const requestAnimalForms = "REQUEST_ANIMAL_FORMS_BY_ANIMAL_ID";
const receiveAnimalForms = "RECEIVE_ANIMAL_FORMS_BY_ANIMAL_ID";
const errorAnimalForms = "ERROR_ANIMAL_FORMS_BY_ANIMAL_ID";

const initialState = {
    isLoading: false,
    value: null,
    isError: false,
    errorMessage: null
};

export const actionCreators = {
  
    getFormsByAnimalId: (id) => async dispatch => {
        dispatch({
            type: requestAnimalForms,
            payload: {
                isLoading: true,
            }
        });
        database.collection("animals").doc(id).collection("forms").get().then(animalFormResponse => {
            if (animalFormResponse.empty == false) {
                var dataArray = [];
                var docCount = 0
                docCount = animalFormResponse.docs.length
                animalFormResponse.docs.forEach(doc => {
                    var animalFormData = doc.data();
                    database.collection("forms").doc(doc.id).get().then(response => {
                        if (response.exists) {
                            animalFormData['details'] = response.data();
                            dataArray.push(animalFormData)
                            if (dataArray.length == docCount) {
                                dispatch({
                                    type: receiveAnimalForms,
                                    payload: {
                                        isLoading: false,
                                        isError: false,
                                        value: dataArray
                                    }
                                });
                            }
                        }
                });
            });
               
            } else {
                dispatch({
                    type: receiveAnimalForms,
                    payload: {
                        isLoading: false,
                        isError: false,
                        errorMessage: `Forms not found.`
                    }
                });
            }
        })
            .catch(error => {
                dispatch({
                    type: errorAnimalForms,
                    payload: {
                        isLoading: false,
                        isError: true,
                        errorMessage: `${error.error} ${error.message}`
                    }
                });
            });
    }
};


function updateState(existingObject, newObject) {

    if (newObject == undefined) {
        return existingObject;
    }
    var hash = Object.create(null);
    newObject.concat(existingObject).forEach(function (obj) {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var updatedObject = Object.keys(hash).map(function (key) {
        return hash[key];
    });
    return updatedObject
}

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case requestAnimalForms:
        case receiveAnimalForms:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorAnimalForms:
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
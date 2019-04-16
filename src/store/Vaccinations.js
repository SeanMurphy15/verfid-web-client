import firebase from '../firebase';

const database = firebase.firestore();

const requestAnimalVaccinations = "REQUEST_ANIMAL_VACCINATIONS_BY_ANIMAL_ID";
const receiveAnimalVaccinations = "RECEIVE_ANIMAL_VACCINATIONS_BY_ANIMAL_ID";
const errorAnimalVaccinations = "ERROR_ANIMAL_VACCINATIONS_BY_ANIMAL_ID";

const initialState = {
    isLoading: false,
    value: null,
    isError: false,
    errorMessage: null
};

export const actionCreators = {
  
    getVaccinationsByAnimalId: (id) => async dispatch => {
        dispatch({
            type: requestAnimalVaccinations,
            payload: {
                isLoading: true,
            }
        });
        database.collection("animals").doc(id).collection("vaccinations").get().then(animalVacResponse => {
            if (animalVacResponse.empty == false) {
                var dataArray = [];
                var docCount = 0
                docCount = animalVacResponse.docs.length
                animalVacResponse.docs.forEach(doc => {
                    var animalVacData = doc.data();
                    database.collection("vaccinations").doc(doc.id).get().then(response => {
                        if (response.exists) {
                            animalVacData['details'] = response.data();
                            dataArray.push(animalVacData)
                            if (dataArray.length == docCount) {
                                dispatch({
                                    type: receiveAnimalVaccinations,
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
                    type: receiveAnimalVaccinations,
                    payload: {
                        isLoading: false,
                        isError: false,
                        errorMessage: `Vaccinations not found.`
                    }
                });
            }
        })
            .catch(error => {
                dispatch({
                    type: errorAnimalVaccinations,
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
        case requestAnimalVaccinations:
        case receiveAnimalVaccinations:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorAnimalVaccinations:
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
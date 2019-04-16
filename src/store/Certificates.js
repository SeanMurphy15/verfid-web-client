import firebase from '../firebase';

const database = firebase.firestore();

const requestAnimalCertificates = "REQUEST_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";
const receiveAnimalCertificates = "RECEIVE_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";
const errorAnimalCertificates = "ERROR_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";

const initialState = {
    isLoading: false,
    value: null,
    isError: false,
    errorMessage: null
};

export const actionCreators = {
  
    getCertificatesByAnimalId: (id) => async dispatch => {
        dispatch({
            type: requestAnimalCertificates,
            payload: {
                isLoading: true,
            }
        });
        database.collection("animals").doc(id).collection("certificates").get().then(animalCertResponse => {
            if (animalCertResponse.empty == false) {
                var dataArray = [];
                var docCount = 0
                docCount = animalCertResponse.docs.length
                animalCertResponse.docs.forEach(doc => {
                    var animalCertData = doc.data();
                    database.collection("certificates").doc(doc.id).get().then(response => {
                        if (response.exists) {
                            animalCertData['details'] = response.data();
                            dataArray.push(animalCertData)
                            if (dataArray.length == docCount) {
                                dispatch({
                                    type: receiveAnimalCertificates,
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
                    type: receiveAnimalCertificates,
                    payload: {
                        isLoading: false,
                        isError: false,
                        errorMessage: `Certificates not found.`
                    }
                });
            }
        })
            .catch(error => {
                dispatch({
                    type: errorAnimalCertificates,
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
        case requestAnimalCertificates:
        case receiveAnimalCertificates:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorAnimalCertificates:
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
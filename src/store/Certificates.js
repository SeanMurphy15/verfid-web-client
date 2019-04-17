import firebase from '../firebase';

const database = firebase.firestore();

const requestAnimalCertificates = "REQUEST_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";
const receiveAnimalCertificates = "RECEIVE_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";
const errorAnimalCertificates = "ERROR_ANIMAL_CERTIFICATES_BY_ANIMAL_ID";

const requestBusinessRequirementCertificatesByIds = "REQUEST_BUSINESS_CERTIFICATES_BY_IDS";
const receiveBusinessRequirementCertificatesByIds = "RECEIVE_BUSINESS_CERTIFICATES_BY_IDS";
const errorBusinessRequirementCertificatesByIds = "ERROR_BUSINESS_CERTIFICATES_BY_IDS";

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
    },
    getBusinessRequirementCertificatesByIds: (ids) => async dispatch => {
        dispatch({
            type: requestBusinessRequirementCertificatesByIds,
            payload: {
                isLoading: true,
            }
        });

        var dataArray = [];

        ids.forEach(id => {
            database.collection("certificates").doc(id).get().then(certResponse => {

                if (certResponse.empty == false) {
                    var data = certResponse.data
                    dataArray.push(data)
                    if (ids.length == dataArray.length) {

                        dispatch({
                            type: receiveBusinessRequirementCertificatesByIds,
                            payload: {
                                isLoading: false,
                                value: dataArray
                            }
                        });
                    }

                } else {
                    dispatch({
                        type: receiveBusinessRequirementCertificatesByIds,
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
                        type: errorBusinessRequirementCertificatesByIds,
                        payload: {
                            isLoading: false,
                            isError: true,
                            errorMessage: `${error.error} ${error.message}`
                        }
                    });
                });
        });

    }
};

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
        case requestBusinessRequirementCertificatesByIds:
        case receiveBusinessRequirementCertificatesByIds:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                value: action.payload.value
            };
        case errorBusinessRequirementCertificatesByIds:
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
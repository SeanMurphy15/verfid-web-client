import firebase from '../firebase';
import { Promise } from 'q';

const database = firebase.firestore();


const requestBusinessById = "REQUEST_BUSINESS_BY_ID";
const receiveBusinessById = "RECEIVE_BUSINESS_BY_ID";
const errorBusinessById = "ERROR_BUSINESS_BY_ID";

const requestBusinessRequirementsById = "REQUEST_BUSINESS_REQUIREMENTS_BY_ID";
const receiveBusinessRequirementsById = "RECEIVE_BUSINESS_REQUIREMENTS_BY_ID";
const errorBusinessRequirementsById = "ERROR_BUSINESS_REQUIREMENTS_BY_ID";

const requestBusinessCertificateReferencesByRequirements = "REQUEST_BUSINESS_CERTIFICATE_REFERENCES_BY_REQUIREMENTS";
const receiveBusinessCertificateReferencesByRequirements = "RECEIVE_BUSINESS_CERTIFICATE_REFERENCES_BY_REQUIREMENTS";
const errorBusinessCertificateReferencesByRequirements = "ERROR_BUSINESS_CERTIFICATE_REFERENCES_BY_REQUIREMENTS";

const requestBusinessVaccinationReferencesByRequirements = "REQUEST_BUSINESS_VACCINATION_REFERENCES_BY_REQUIREMENTS";
const receiveBusinessVaccinationReferencesByRequirements = "RECEIVE_BUSINESS_VACCINATION_REFERENCES_BY_REQUIREMENTS";
const errorBusinessVaccinationReferencesByRequirements = "ERROR_BUSINESS_VACCINATION_REFERENCES_BY_REQUIREMENTS";

const requestBusinessFormReferencesByRequirements = "REQUEST_BUSINESS_FORM_REFERENCES_BY_REQUIREMENTS";
const receiveBusinessFormReferencesByRequirements = "RECEIVE_BUSINESS_FORM_REFERENCES_BY_REQUIREMENTS";
const errorBusinessFormReferencesByRequirements = "ERROR_BUSINESS_FORM_REFERENCES_BY_REQUIREMENTS";

const requestBusinessBatch = "REQUEST_BUSINESS_BATCH";
const receiveBusinessBatch = "RECEIVE_BUSINESS_BATCH";

const initialState = {
    isLoading: false,
    value: null,
    requirements: null,
    certificateReferences: null,
    vaccinationReferences: null,
    formReferences: null,
    isError: false,
    errorMessage: null
};

export const fetchBusinessByIdAction = (id) => (

    dispatch => {
        dispatch({
            type: requestBusinessBatch,
            payload: {
                isLoading: true
            }
        });
        fetchBusinessById(id).then(business => {
            dispatch({
                type: requestBusinessById,
                payload: {}
            });
            dispatch(business)
        }).then(() => {
            dispatch({
                type: requestBusinessRequirementsById,
                payload: {}
            });
            fetchBusinessRequirementsById(id)
                .then(requirements => {
                    dispatch(requirements)
                    dispatch({
                        type: requestBusinessCertificateReferencesByRequirements,
                        payload: {}
                    });
                    fetchBusinessCertificateReferencesByRequirements(requirements)
                        .then(certificateReferences => {
                            dispatch(certificateReferences)
                        })
                    dispatch({
                        type: requestBusinessVaccinationReferencesByRequirements,
                        payload: {}
                    });
                    fetchBusinessVaccinationReferencesByRequirements(requirements)
                        .then(vaccinationReferences => {
                            dispatch(vaccinationReferences)
                        })
                    dispatch({
                        type: requestBusinessFormReferencesByRequirements,
                        payload: {}
                    });
                    fetchBusinessFormReferencesByRequirements(requirements)
                        .then(formReferences => {
                            dispatch(formReferences)
                            dispatch({
                                type: receiveBusinessBatch,
                                payload: {
                                    isLoading: false
                                }
                            });
                        })
                })
        })
    }
)

export function fetchBusinessById(id) {

    let promise = new Promise(function (resolve, reject) {

        database.collection("businesses").doc(id).get()
            .then(response => {
                if (response.exists) {
                    var business = response.data();
                    business["id"] = response.id;
                    resolve({
                        type: receiveBusinessById,
                        payload: {
                            value: business
                        }
                    });
                } else {
                    resolve({
                        type: receiveBusinessById,
                        payload: {
                            isError: true,
                            errorMessage: `Business not found.`
                        }
                    });
                }
            })
            .catch(error => {
                resolve({
                    type: errorBusinessById,
                    payload: {
                        isError: true,
                        errorMessage: `${error.error} ${error.message}`
                    }
                });
            });
    })
    return promise
}

export function fetchBusinessRequirementsById(id) {

    let promise = new Promise(function (resolve, reject) {

        database.collection("businesses").doc(id).collection("requirements").get().then(requirements => {
            if (requirements.empty == false) {
                var dataArray = [];
                requirements.docs.forEach(doc => {
                    var data = doc.data();
                    data["species"] = doc.id
                    dataArray.push(data)
                });
                resolve({
                    type: receiveBusinessRequirementsById,
                    payload: {
                        requirements: dataArray
                    }
                });
            } else {
                resolve({
                    type: receiveBusinessRequirementsById,
                    payload: {
                        isError: true,
                        errorMessage: `Business requirements not found.`
                    }
                });
            }
        }).catch(error => {
            resolve({
                type: errorBusinessRequirementsById,
                payload: {
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    })
    return promise
}

export function fetchBusinessCertificateReferencesByRequirements(requirements) {

    let promise = new Promise(function (resolve, reject) {

        database.collection("references").doc("certificates").get().then(response => {
            if (response.exists) {
                var data = response.data();
                var dataDict = {};
                var dataArray = [];
                requirements.payload.requirements.forEach(requirement => {
                    requirement.certificates.forEach(id => {
                        if (id in data) {
                            dataArray.push(data[id])
                            dataDict[requirement.species] = dataArray
                        }
                    });

                });
                resolve({
                    type: receiveBusinessCertificateReferencesByRequirements,
                    payload: {
                        certificateReferences: dataDict
                    }
                });
            } else {
                resolve({
                    type: receiveBusinessCertificateReferencesByRequirements,
                    payload: {
                        isError: true,
                        errorMessage: `Certificate references not found.`
                    }
                });
            }
        }).catch(error => {
            resolve({
                type: errorBusinessCertificateReferencesByRequirements,
                payload: {
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    })
    return promise
}

export function fetchBusinessVaccinationReferencesByRequirements(requirements) {

    let promise = new Promise(function (resolve, reject) {

        database.collection("references").doc("vaccinations").get().then(response => {
            if (response.exists) {
                var data = response.data();
                var dataDict = {};
                var dataArray = [];
                requirements.payload.requirements.forEach(requirement => {
                    requirement.vaccinations.forEach(id => {
                        if (id in data) {
                            dataArray.push(data[id])
                            dataDict[requirement.species] = dataArray
                        }
                    });

                });
                resolve({
                    type: receiveBusinessVaccinationReferencesByRequirements,
                    payload: {
                        vaccinationReferences: dataDict
                    }
                });
            } else {
                resolve({
                    type: receiveBusinessVaccinationReferencesByRequirements,
                    payload: {
                        isError: true,
                        errorMessage: `Vaccination references not found.`
                    }
                });
            }
        }).catch(error => {
            resolve({
                type: errorBusinessVaccinationReferencesByRequirements,
                payload: {
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    })
    return promise
}

export function fetchBusinessFormReferencesByRequirements(requirements) {

    let promise = new Promise(function (resolve, reject) {

        database.collection("references").doc("forms").get().then(response => {
            if (response.exists) {
                var data = response.data();
                var dataDict = {};
                var dataArray = [];
                requirements.payload.requirements.forEach(requirement => {
                    requirement.forms.forEach(id => {
                        if (id in data) {
                            dataArray.push(data[id])
                            dataDict[requirement.species] = dataArray
                        }
                    });

                });
                resolve({
                    type: receiveBusinessFormReferencesByRequirements,
                    payload: {
                        formReferences: dataDict
                    }
                });
            } else {
                resolve({
                    type: receiveBusinessFormReferencesByRequirements,
                    payload: {
                        isError: true,
                        errorMessage: `Form references not found.`
                    }
                });
            }
        }).catch(error => {
            resolve({
                type: errorBusinessFormReferencesByRequirements,
                payload: {
                    isError: true,
                    errorMessage: `${error.error} ${error.message}`
                }
            });
        });
    })
    return promise
}

export const reducer = (state, action) => {
    var newState = state || initialState;
    switch (action.type) {
        case requestBusinessById:
        case receiveBusinessById:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case errorBusinessById:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case requestBusinessRequirementsById:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case receiveBusinessRequirementsById:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case errorBusinessRequirementsById:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case requestBusinessCertificateReferencesByRequirements:
        case receiveBusinessCertificateReferencesByRequirements:
            newState = state;
            return Object.assign({}, newState, action.payload);
        case errorBusinessCertificateReferencesByRequirements:
            newState = state;
            return Object.assign({}, newState, action.payload);
            case requestBusinessVaccinationReferencesByRequirements:
            case receiveBusinessVaccinationReferencesByRequirements:
                newState = state;
                return Object.assign({}, newState, action.payload);
            case errorBusinessVaccinationReferencesByRequirements:
                newState = state;
                return Object.assign({}, newState, action.payload);
                case requestBusinessFormReferencesByRequirements:
            case receiveBusinessFormReferencesByRequirements:
                newState = state;
                return Object.assign({}, newState, action.payload);
            case errorBusinessFormReferencesByRequirements:
                newState = state;
                return Object.assign({}, newState, action.payload);

                case requestBusinessBatch:
                newState = state;
                    return Object.assign({}, newState, action.payload);
                case receiveBusinessBatch:
                    newState = state;
                    return Object.assign({}, newState, action.payload);
        default:
            return newState;
    }
};


// import firebase from '../firebase';

// const database = firebase.firestore();


// const requestBusinessById = "REQUEST_BUSINESS_BY_ID";
// const receiveBusinessById = "RECEIVE_BUSINESS_BY_ID";
// const errorBusinessById = "ERROR_BUSINESS_BY_ID";

// const requestBusinessRequirementsById = "REQUEST_BUSINESS_REQUIREMENTS_BY_ID";
// const receiveBusinessRequirementsById = "RECEIVE_BUSINESS_REQUIREMENTS_BY_ID";
// const errorBusinessRequirementsById = "ERROR_BUSINESS_REQUIREMENTS_BY_ID";

// const requestBusinessRequirementsCertificateDetailsByIds = "REQUEST_BUSINESS_REQUIREMENTS_CERTIFICATE_DETAILS_BY_IDS";
// const receiveBusinessRequirementsCertificateDetailsByIds = "RECEIVE_BUSINESS_REQUIREMENTS_CERTIFICATE_DETAILS_BY_IDS";
// const errorBusinessRequirementsCertificateDetailsByIds = "ERROR_BUSINESS_REQUIREMENTS_CERTIFICATE_DETAILS_BY_IDS";

// const initialState = {
//  isLoading: false,
//  value: null,
//  isError: false,
//  errorMessage: null
// };

// export const actionCreators = {

//   getBusinessDataById: (id) => async dispatch => {

//       dispatch({
//     type: requestBusinessById,
//     payload: {
//       isLoading: true,
//     }
//   });
//     getBusinessById(id).then(businessPayload => {
//         dispatch(businessPayload)

//         dispatch({
//           type: requestBusinessRequirementsById,
//           payload: {
//             isLoading: true,
//           }
//         });
//         getBusinessRequirementsById(id).then(requirementsPayload => {
//           dispatch(requirementsPayload)

//           dispatch({
//             type: requestBusinessRequirementsCertificateDetailsByIds,
//             payload: {
//                 isLoading: true,
//             }
//         });
//           getBusinessRequirementsCertificateDetailsByIds(requirementsPayload.certificates).then(certificateDetailsPayload => {
//             dispatch(certificateDetailsPayload)

//           });
//         });
//     })
//   } 
// };


// function getBusinessById (id) {

//  var promise = database.collection("businesses").doc(id).get().then(response => {
//     if (response.exists) {
//       var data = response.data();
//           data["id"] = response.id;
//       return({
//         type: receiveBusinessById,
//         payload: {
//           isLoading: false, 
//           value: data
//         }
//       });
//   } else {
//     return({
//       type: receiveBusinessById,
//       payload: {
//         isLoading: false,
//         isError: true,
//         errorMessage: `Business not found.`
//       }
//     });
//   }
//     })
//     .catch(error => {        
//       return({
//         type: errorBusinessById,
//         payload: {
//           isLoading: false,
//           isError: true,
//           errorMessage: `${error.error} ${error.message}`
//         }
//       });
//     });

//     return promise;
// }

// export function getBusinessRequirementsById (id) {

//   database.collection("businesses").doc(id).collection("requirements").get().then(response => {
//     if (response.empty == false) {
//       var dataArray = [];
//       response.docs.forEach(doc => {
//           var data = doc.data();
//           data["id"] = doc.id;
//           dataArray.push(data)
//       });
//       return({
//           type: receiveBusinessRequirementsById,
//           payload: {
//               isLoading: false, 
//               requirements: dataArray
//           }
//       });
//   } else {
//       return({
//           type: receiveBusinessRequirementsById,
//           payload: {
//               isLoading: false,
//               isError: false,
//               errorMessage: `Animals not found.`
//           }
//       });
//   }
// }).catch(error => {        
//       return({
//         type: errorBusinessRequirementsById,
//         payload: {
//           isLoading: false,
//           isError: true,
//           errorMessage: `${error.error} ${error.message}`
//         }
//       });
//     });
// }

// export function getBusinessRequirementsCertificateDetailsByIds(ids) {

//   var dataArray = [];

//   ids.forEach(id => {
//       database.collection("certificates").doc(id).get().then(certResponse => {

//           if (certResponse.empty == false) {
//               var data = certResponse.data
//               dataArray.push(data)
//               if (ids.length == dataArray.length) {

//                   return({
//                       type: receiveBusinessRequirementsCertificateDetailsByIds,
//                       payload: {
//                           isLoading: false,
//                           certificateDetails: dataArray
//                       }
//                   });
//               }

//           } else {
//               return({
//                   type: receiveBusinessRequirementsCertificateDetailsByIds,
//                   payload: {
//                       isLoading: false,
//                       isError: false,
//                       errorMessage: `Certificate details not found.`
//                   }
//               });
//           }
//       })
//           .catch(error => {
//               return({
//                   type: errorBusinessRequirementsCertificateDetailsByIds,
//                   payload: {
//                       isLoading: false,
//                       isError: true,
//                       errorMessage: `${error.error} ${error.message}`
//                   }
//               });
//           });
//   });
// }

// export const reducer = (state, action) => {
//  var newState = state || initialState;
//  switch (action.type) {
//    case requestBusinessById:
//    case receiveBusinessById:
//    newState = state;
//    return Object.assign(newState, action.payload);
//    case errorBusinessById:
//    newState = state;
//    return Object.assign(newState, action.payload);
//      case requestBusinessRequirementsById:
//      newState = state;
//      return Object.assign(newState, action.payload);
//      case receiveBusinessRequirementsById:
//      newState = state;
//      return Object.assign(newState, action.payload);
//      case errorBusinessRequirementsById:
//      newState = state;
//      return Object.assign(newState, action.payload);
//      case requestBusinessRequirementsCertificateDetailsByIds:
//      case receiveBusinessRequirementsCertificateDetailsByIds:
//      newState = state;
//      return Object.assign(newState, action.payload);
//      case errorBusinessRequirementsCertificateDetailsByIds:
//      newState = state;
//      return Object.assign(newState, action.payload);
//    default:
//      return newState;
//  }
// };
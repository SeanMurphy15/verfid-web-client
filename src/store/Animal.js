

import firebase from '../firebase';
import { Promise } from 'q';

const database = firebase.firestore();

const requestAnimalById = "REQUEST_ANIMAL_BY_ID";
const receiveAnimalById = "RECEIVE_ANIMAL_BY_ID";
const errorAnimalById = "ERROR_ANIMAL_BY_ID";

const requestAnimalCertificatesById = "REQUEST_ANIMAL_CERTIFICATES_BY_ID";
const receiveAnimalCertificatesById = "RECEIVE_ANIMAL_CERTIFICATES_BY_ID";
const errorAnimalCertificatesById = "ERROR_ANIMAL_CERTIFICATES_BY_ID";

const requestAnimalCertificateReferences = "REQUEST_ANIMAL_CERTIFICATE_REFERENCES";
const receiveAnimalCertificateReferences = "RECEIVE_ANIMAL_CERTIFICATE_REFERENCES";
const errorAnimalCertificateReferences = "ERROR_ANIMAL_CERTIFICATE_REFERENCES";

const requestAnimalVaccinationReferences = "REQUEST_ANIMAL_VACCINATION_REFERENCES";
const receiveAnimalVaccinationReferences = "RECEIVE_ANIMAL_VACCINATION_REFERENCES";
const errorAnimalVaccinationReferences = "ERROR_ANIMAL_VACCINATION_REFERENCES";

const requestAnimalFormReferences = "REQUEST_ANIMAL_FORM_REFERENCES";
const receiveAnimalFormReferences = "RECEIVE_ANIMAL_FORM_REFERENCES";
const errorAnimalFormReferences = "ERROR_ANIMAL_FORM_REFERENCES";

const requestAnimalVaccinationsById = "REQUEST_ANIMAL_VACCINATIONS_BY_ID";
const receiveAnimalVaccinationsById = "RECEIVE_ANIMAL_VACCINATIONS_BY_ID";
const errorAnimalVaccinationsById = "ERROR_ANIMAL_VACCINATIONS_BY_ID";

const requestAnimalFormsById = "REQUEST_ANIMAL_FORMS_BY_ID";
const receiveAnimalFormsById = "RECEIVE_ANIMAL_FORMS_BY_ID";
const errorAnimalFormsById = "ERROR_ANIMAL_FORMS_BY_ID";

const requestAnimalBatch = "REQUEST_ANIMAL_BATCH";
const receiveAnimalBatch = "RECEIVE_ANIMAL_BATCH";

const initialState = {
  isLoading: false,
  value: null,
  certificates: [],
  vaccinations: [],
  forms: [],
  isError: false,
  errorMessage: null
};

export const fetchAnimalByIdAction = (id) => (

  dispatch => {
    dispatch({
      type: requestAnimalBatch,
      payload: {
        isLoading: true
      }
    });
    fetchAnimalById(id).then(animal => {
      dispatch(animal)
    }).then(() => {
      fetchAnimalCertificatesById(id).then(certificates => {
        fetchAnimalCertificateReferences(certificates).then(certificates => {
          dispatch(certificates)
        })
      }).then(() => {
        fetchAnimalVaccinationsById(id).then(vaccinations => {
          fetchAnimalVaccinationReferences(vaccinations).then(vaccinations => {
            dispatch(vaccinations)
          })
        }).then(() => {
          fetchAnimalFormsById(id).then(forms => {
            fetchAnimalFormReferences(forms).then(forms => {
              dispatch(forms)
            }).then(() => {
              dispatch({
                type: receiveAnimalBatch,
                payload: {
                  isLoading: false
                }
              });
            })
          })
        })
      })
    })
  }
)

export function fetchAnimalById(id) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("animals").doc(id).get()
      .then(response => {
        if (response.exists) {
          var animal = response.data();
          animal["id"] = response.id;
          resolve({
            type: receiveAnimalById,
            payload: {
              value: animal
            }
          });
        } else {
          resolve({
            type: receiveAnimalById,
            payload: {
              isError: true,
              errorMessage: `Animal not found.`
            }
          });
        }
      })
      .catch(error => {
        resolve({
          type: errorAnimalById,
          payload: {
            isError: true,
            errorMessage: `${error.error} ${error.message}`
          }
        });
      });
  })
  return promise
}

export function fetchAnimalCertificatesById(id) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("animals").doc(id).collection("certificates").get().then(response => {
      if (response.empty == false) {
        var dataArray = [];
       response.docs.forEach(doc => {
          var data = doc.data();
            dataArray.push(data)
        });
        resolve({
          type: receiveAnimalCertificatesById,
          payload: {
            certificates: dataArray
          }
        });
      } else {
        resolve({
          type: receiveAnimalCertificatesById,
          payload: {
            isError: true,
            errorMessage: `Animal certificates not found.`
          }
        });
      }
    }).catch(error => {
      resolve({
        type: errorAnimalCertificatesById,
        payload: {
          isError: true,
          errorMessage: `${error.error} ${error.message}`
        }
      });
    });
  })
  return promise
}

export function fetchAnimalCertificateReferences(certificates) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("references").doc("certificates").get().then(response => {
        if (response.exists) {
            var referenceData = response.data();
            var dataArray=[];
            certificates.payload.certificates.forEach(certificate => {
                    if (certificate.id in referenceData) {            
                      certificate["reference"] = referenceData[certificate.id]
                      dataArray.push(certificate)
                    }
                });

            resolve({
                type: receiveAnimalCertificateReferences,
                payload: {
                    certificates: dataArray
                }
            });
        } else {
            resolve({
                type: receiveAnimalCertificateReferences,
                payload: {
                    isError: true,
                    errorMessage: `Certificate references not found.`
                }
            });
        }
    }).catch(error => {
        resolve({
            type: errorAnimalCertificateReferences,
            payload: {
                isError: true,
                errorMessage: `${error.error} ${error.message}`
            }
        });
    });
})
return promise
}
export function fetchAnimalVaccinationReferences(vaccinations) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("references").doc("vaccinations").get().then(response => {
        if (response.exists) {
            var referenceData = response.data();
            var dataArray=[];
            vaccinations.payload.vaccinations.forEach(vaccination => {
                    if (vaccination.id in referenceData) {            
                      vaccination["reference"] = referenceData[vaccination.id]
                      dataArray.push(vaccination)
                    }
                });

            resolve({
                type: receiveAnimalVaccinationReferences,
                payload: {
                    vaccinations: dataArray
                }
            });
        } else {
            resolve({
                type: receiveAnimalVaccinationReferences,
                payload: {
                    isError: true,
                    errorMessage: `Vaccination references not found.`
                }
            });
        }
    }).catch(error => {
        resolve({
            type: errorAnimalVaccinationReferences,
            payload: {
                isError: true,
                errorMessage: `${error.error} ${error.message}`
            }
        });
    });
})
return promise
}

export function fetchAnimalFormReferences(forms) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("references").doc("forms").get().then(response => {
        if (response.exists) {
            var referenceData = response.data();
            var dataArray=[];
            forms.payload.forms.forEach(form => {
                    if (form.id in referenceData) {            
                      form["reference"] = referenceData[form.id]
                      dataArray.push(form)
                    }
                });

            resolve({
                type: receiveAnimalFormReferences,
                payload: {
                    forms: dataArray
                }
            });
        } else {
            resolve({
                type: receiveAnimalFormReferences,
                payload: {
                    isError: true,
                    errorMessage: `Form references not found.`
                }
            });
        }
    }).catch(error => {
        resolve({
            type: errorAnimalFormReferences,
            payload: {
                isError: true,
                errorMessage: `${error.error} ${error.message}`
            }
        });
    });
})
return promise
}

export function fetchAnimalVaccinationsById(id) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("animals").doc(id).collection("vaccinations").get().then(response => {
      if (response.empty == false) {
        var dataArray = [];
        response.docs.forEach(doc => {
          var data = doc.data();
          dataArray.push(data)
        });
        resolve({
          type: receiveAnimalVaccinationsById,
          payload: {
            vaccinations: dataArray
          }
        });
      } else {
        resolve({
          type: receiveAnimalVaccinationsById,
          payload: {
            isError: true,
            errorMessage: `Animal vaccinations not found.`
          }
        });
      }
    }).catch(error => {
      resolve({
        type: errorAnimalVaccinationsById,
        payload: {
          isError: true,
          errorMessage: `${error.error} ${error.message}`
        }
      });
    });
  })
  return promise
}


export function fetchAnimalFormsById(id) {

  let promise = new Promise(function (resolve, reject) {

    database.collection("animals").doc(id).collection("forms").get().then(response => {
      if (response.empty == false) {
        var dataArray = [];
        response.docs.forEach(doc => {
          var data = doc.data();
          dataArray.push(data)
        });
        resolve({
          type: receiveAnimalFormsById,
          payload: {
            forms: dataArray
          }
        });
      } else {
        resolve({
          type: receiveAnimalFormsById,
          payload: {
            isError: true,
            errorMessage: `Animal forms not found.`
          }
        });
      }
    }).catch(error => {
      resolve({
        type: errorAnimalVaccinationsById,
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

    case requestAnimalById:
    case receiveAnimalById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalById:
      newState = state;
      return Object.assign({}, newState, action.payload);

    case requestAnimalCertificatesById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalCertificatesById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalCertificatesById:
      newState = state;
      return Object.assign({}, newState, action.payload);

      case requestAnimalCertificateReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalCertificateReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalCertificateReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);

      case requestAnimalFormReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalFormReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalFormReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);

      case requestAnimalVaccinationReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalVaccinationReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalVaccinationReferences:
      newState = state;
      return Object.assign({}, newState, action.payload);

    case requestAnimalVaccinationsById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalVaccinationsById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalVaccinationsById:
      newState = state;
      return Object.assign({}, newState, action.payload);

    case requestAnimalFormsById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalFormsById:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case errorAnimalFormsById:
      newState = state;
      return Object.assign({}, newState, action.payload);

    case requestAnimalBatch:
      newState = state;
      return Object.assign({}, newState, action.payload);
    case receiveAnimalBatch:
      newState = state;
      return Object.assign({}, newState, action.payload);

    default:
      return newState;
  }
};


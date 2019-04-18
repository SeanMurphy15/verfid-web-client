import firebase from '../firebase';
import { Promise } from 'q';

const database = firebase.firestore();


const requestBusinessById = "REQUEST_BUSINESS_BY_ID";
const receiveBusinessById = "RECEIVE_BUSINESS_BY_ID";
const errorBusinessById = "ERROR_BUSINESS_BY_ID";

const requestBusinessRequirementsById = "REQUEST_BUSINESS_REQUIREMENTS_BY_ID";
const receiveBusinessRequirementsById = "RECEIVE_BUSINESS_REQUIREMENTS_BY_ID";
const errorBusinessRequirementsById = "ERROR_BUSINESS_REQUIREMENTS_BY_ID";

const requestCertificatesByIds = "REQUEST_BUSINESS_CERTIFICATES_BY_IDS";
const receiveBusinessCertificatesByIds = "RECEIVE_BUSINESS_CERTIFICATES_BY_IDS";
const errorBusinessCertificatesByIds = "ERROR_BUSINESS_CERTIFICATES_BY_IDS";

const initialState = {
 isLoading: true,
 value: null,
 requirements: null,
 certificateDetails: null,
 isError: false,
 errorMessage: null
};

export const actionCreators = {

 fetchBusinessById : (id) => async dispatch => {

  getData(id).then(business => {
    dispatch(business)
    getBusinessRequirementsById(id)
    .then(requirements => {
      dispatch(requirements)
   }).then(requirements => {
    getCertificatesByIds(requirements.payload.requirements).then(certificates => {
      dispatch(certificates)
    }).catch(certificatesError => {
      dispatch(certificatesError)
     })
   }).catch(requirementsError => {
    dispatch(requirementsError)
   })
 }).catch(businessError => {
  dispatch(businessError)
 })
}
};

   function getData(id){
    return new Promise((resolve, reject)=>{
        database.collection("businesses").doc(id).get()
        .then(response => {
          if (response.exists) {
            var data = response.data();
                data["id"] = response.id;
                resolve({
              type: receiveBusinessById,
              payload: {
                isLoading: false, 
                value: data
              }
            });
        } else {
          resolve({
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
            reject({
              type: errorBusinessById,
              payload: {
                isLoading: false,
                isError: true,
                errorMessage: `${error.error} ${error.message}`
              }
            });
          });
    });
}

 function getBusinessRequirementsById (id) {
 
  return new Promise((resolve, reject)=>{

  database.collection("businesses").doc(id).collection("requirements").get().then(response => {
    if (response.empty == false) {
      var dataArray = [];
      response.docs.forEach(doc => {
          var data = doc.data();
          data["id"] = doc.id;
          dataArray.push(data)
      });
      resolve({
          type: receiveBusinessRequirementsById,
          payload: {
              isLoading: false, 
              requirements: dataArray
          }
      });
  } else {
    resolve({
          type: receiveBusinessRequirementsById,
          payload: {
              isLoading: false,
              isError: false,
              errorMessage: `Animals not found.`
          }
      });
  }
}).catch(error => {        
      reject({
        type: errorBusinessRequirementsById,
        payload: {
          isLoading: false,
          isError: true,
          errorMessage: `${error.error} ${error.message}`
        }
      });
    });
  }); 
}


  function getCertificatesByIds(requirements){

  // dispatch({
  //   type: requestBusinessRequirementsCertificateDetailsByIds,
  //   payload: {
  //     isLoading: true,
  //   }
  // });
  const certificates = requirements.map(species => species.certificates);

  // var dbRef = db.collection("references").doc("certificates");
  // var dbQuery = dbRef.where("id", "==", certificates[0]);
  // var dbPromise = dbQuery.get().value;
  // // return the main promise
  // return dbPromise.then(function(querySnapshot) {
  //     var results = [];
  //     querySnapshot.forEach(function(doc) {
  //         var docRef = db.collection("faculty").doc(doc.id);
  //         // push promise from get into results
  //         results.push(docRef.get())
  //     });
  //     // dbPromise.then() resolves to  a single promise that resolves 
  //     // once all results have resolved
  //     return Promise.all(results)
  // })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });
    var promise = certificates.forEach(certificateId => {
      database.collection("references").doc("certificates").where("id", "==", certificateId).get().then(certResponse => {
        var dataArray = [];
          if (certResponse.empty == false) {
              var data = certResponse.data
              dataArray.push(data)
              if (requirements.length == dataArray.length) {
                return ({
                      type: receiveBusinessCertificatesByIds,
                      payload: {
                          isLoading: false,
                          certificateDetails: dataArray
                      }
                  });
              }
              return Promise.resolve(promise)
          } else {
            return Promise.resolve({
                  type: receiveBusinessCertificatesByIds,
                  payload: {
                      isLoading: false,
                      isError: false,
                      errorMessage: `Certificate details not found.`
                  }
              });
          }
      })
          .catch(error => {
            return Promise.reject({
                  type: errorBusinessCertificatesByIds,
                  payload: {
                      isLoading: false,
                      isError: true,
                      errorMessage: `${error.error} ${error.message}`
                  }
              });
          });
    });
 }

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
      case requestCertificatesByIds:
      case receiveBusinessCertificatesByIds:
      newState = state;
      return Object.assign(newState, action.payload);
      case errorBusinessCertificatesByIds:
      newState = state;
      return Object.assign(newState, action.payload);
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
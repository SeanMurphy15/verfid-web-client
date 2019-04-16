import * as types from './actionTypes';
import firebase from '../firebase';

const database = firebase.firestore();

export function receiveAllCertificates(data) {
    return {type: types.RECEIVE_ALL_CERTIFICATES, certificates: data};
}

export function fetchAllCertificates(id) {
    return (dispatch) => {
        database.collection("certificates").get().then(function (querySnapshot) {
            var dataArray = []; 
            querySnapshot.forEach(function (doc) {
                var data = doc.data()
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var newData = data[key];
                        newData["id"] = key;
                        dataArray.push(newData);
                    }
                }
            });
            dispatch(receiveAllCertificates(dataArray))
        });
    };
}
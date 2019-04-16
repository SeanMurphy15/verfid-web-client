import * as types from './actionTypes';
import firebase from '../firebase';

const database = firebase.firestore();

export function receiveUsers(data) {
    return { type: types.RECEIVE_USERS, users: data };
}

export function fetchUsers() {
    return (dispatch) => {

        database.collection("users").get().then(function (querySnapshot) {
            var dataArray = [];
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                data["id"] = doc.id;
                dataArray.push(data)
            });
            dispatch(receiveUsers(dataArray))

        });
    };
}
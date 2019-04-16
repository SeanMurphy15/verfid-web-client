

import firebase from 'firebase';

const config = {
    // apiKey: "AIzaSyB_SWgc4lziipGvr7S5B3iPkwE5Fj10yew",
    // authDomain: "verfid-db.firebaseapp.com",
    // databaseURL: "https://verfid-db.firebaseio.com",
    // projectId: "verfid-db",
    // storageBucket: "verfid-db.appspot.com",
    // messagingSenderId: "484263079318"

        apiKey: "AIzaSyAybg1Z471DxTm4uATuIQlnP2Pl9S-ZS-I",
        authDomain: "verfid-services-database-dev.firebaseapp.com",
        databaseURL: "https://verfid-services-database-dev.firebaseio.com",
        projectId: "verfid-services-database-dev",
        storageBucket: "verfid-services-database-dev.appspot.com",
        messagingSenderId: "728858975055"
      
};

firebase.initializeApp(config);
export default firebase;
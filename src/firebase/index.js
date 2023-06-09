import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdZQUiiagX4o2zoFJQRyjgrjWpV2DarK0",
    authDomain: "equine-hospital-d9a54.firebaseapp.com",
    databaseURL: "https://equine-hospital-d9a54-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "equine-hospital-d9a54",
    storageBucket: "equine-hospital-d9a54.appspot.com",
    messagingSenderId: "128788100150",
    appId: "1:128788100150:web:8aafa4957cc31f5ad0d497"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth, app, db};
import {
    createUserWithEmailAndPassword,
    updateProfile,
        signOut,
    signInWithEmailAndPassword

} from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAdZQUiiagX4o2zoFJQRyjgrjWpV2DarK0",
    authDomain: "equine-hospital-d9a54.firebaseapp.com",
    databaseURL: "https://equine-hospital-d9a54-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "equine-hospital-d9a54",
    storageBucket: "equine-hospital-d9a54.appspot.com",
    messagingSenderId: "128788100150",
    appId: "1:128788100150:web:8aafa4957cc31f5ad0d497"
};
initializeApp(firebaseConfig);

import {getAuth} from "firebase/auth";
const auth = getAuth();
export async function createNewUser(data, setUser, user, login, email, password) {
    if (login.trim() && email.trim() && password.trim() !== '') {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, data)
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
        setUser({ ...user, displayName: login});
    }
}
// export async function signIn(email, password){
//     await signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error(errorCode, errorMessage);
//
//         });
// }
export async function logOut(setUser){
   await signOut(auth).then(() => {
        setUser('')
        console.log('signed out')
    }).catch((error) => {
        console.log(error)
    });}
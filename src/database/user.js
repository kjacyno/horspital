import {
    createUserWithEmailAndPassword,
    updateProfile,
        signOut,
    signInWithEmailAndPassword
} from "firebase/auth";
import {auth} from '../firebase/index.js'
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
export async function signIn(email, password, setUser){
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);

        });
}
export async function logOut(setUser){
   await signOut(auth).then(() => {
        setUser('')
        console.log('signed out')
    }).catch((error) => {
        console.log(error)
    });}
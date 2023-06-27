import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {auth} from '/src/firebase/index.js'

export async function createNewUser(data, setUser, user, login, email, password) {
    if (login && email && password) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                updateProfile(user, data);
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                throw error
            });
        setUser({...user, displayName: login});

    }
}

export async function signIn(email, password, setUser) {

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.error(errorCode);
            throw error
        });
}

export function logOut(setUser) {
    signOut(auth).then(() => {
        setUser('');
    }).catch((error) => {
        console.log(error);
    });
}
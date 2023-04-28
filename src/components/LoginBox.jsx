import PropTypes from 'prop-types'
import {useState} from "react";
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../firebase/index.js";

function LoginBox({user, setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('');




    async function handleNewUser(event) {
        event.preventDefault();
        if (login.trim() && email.trim() && password.trim() !== '') {
          await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: login
                    })
                    setUser(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });
            setUser({ ...user, displayName: '' });

        }
    }

    return (
        <section className="login-page">
            <div></div>
            <div className="login-box">
                <form onSubmit={handleNewUser}>
                    <label htmlFor="email">Welcome!</label>
                    <input
                        type="text"
                        value={login}
                        id='login'
                        name='login'
                        onChange={(event) => setLogin(event.target.value)}
                        placeholder='Your name/nick'
                    />
                    <label htmlFor="email"></label>
                    <input type="email"
                           value={email}
                           id='email'
                           placeholder='e-mail'
                           onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="pwd"></label>
                    <input type="password"
                           id='password'
                           value={password}
                           placeholder='bulletproof password'
                           onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type='submit'>Sign in</button>
                </form>
            </div>
            <div></div>
        </section>
    );
}

LoginBox.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.any
}
export default LoginBox;
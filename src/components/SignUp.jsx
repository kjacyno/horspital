import PropTypes from 'prop-types'
import {useState} from "react";
import {createNewUser} from "../database/usersData.js";

function SignUp({user, setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('');
    const [isActive, setIsActive] = useState(false)

    async function handleNewUser(event) {
        event.preventDefault();
        await createNewUser(
            {
                displayName: login
            },
            setUser, user, login, email, password
        )
    }

const handleToggle = () => {
    const hasValidInput = login && email.includes("@") && password;
    const hasUppercaseLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (hasValidInput && hasUppercaseLetter && hasNumber) {
        setIsActive(!isActive);
        }
    }
    return (
        <section className="login-page">
            <div></div>
            <div className="login-box">
                <form onSubmit={handleNewUser} className={isActive ? 'animated-box' : 'login-form'}>
                    <label htmlFor="email">SET UP YOUR ACCOUNT</label>
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
                           placeholder='E-mail'
                           onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="pwd"></label>
                    <input type="password"
                           id='password'
                           value={password}
                           placeholder='Password'
                           onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type='submit' onClick={handleToggle}>Done</button>
                </form>
            </div>
            <div></div>
        </section>
    );
}

SignUp.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.any
}
export default SignUp;
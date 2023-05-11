import {signIn} from "../database/usersData.js";
import {useState} from "react";
import PropTypes from "prop-types";

function Login({setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isActive, setIsActive] = useState(false)

    async function handleUserLogin(event) {
        event.preventDefault();
        await signIn(email, password, setUser)
    }

    const handleToggle = () => {
        const hasValidInput = email.includes("@") && password;
        const hasUppercaseLetter = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (hasValidInput && hasUppercaseLetter && hasNumber) {
            setIsActive(!isActive);
        }
    };

    return (
        <section className="login-page">
            <div></div>
            <div className="login-box">
                <form
                    onSubmit={handleUserLogin}
                    className={isActive ? 'animated-box' : 'login-form'}>
                    <label htmlFor="email">LOG IN</label>
                    <input type="email"
                           value={email}
                           id='email'
                           placeholder='E-mail'
                           onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="pwd"></label>
                    <input type="password"
                           id='pwd'
                           value={password}
                           placeholder='Password'
                           onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type='submit'
                            onClick={handleToggle}>
                        OK
                    </button>
                </form>
            </div>
            <div></div>
        </section>
    );
}

Login.propTypes = {
    setUser: PropTypes.func,
}
export default Login;
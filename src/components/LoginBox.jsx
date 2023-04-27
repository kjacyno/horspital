import PropTypes from 'prop-types'
import {useState} from "react";

function LoginBox() {
const [value, setValue] = useState('')
    // function handleInputChange(event) {
    //     const value = event.target.value;
    //     // setLogin(value)
    // }

    function handleUserLogin() {
        if (value.trim() !== '') {
            localStorage.setItem("userName", value);
            setValue('')
        }
    }

    return (
        <section className="login-page">
          <div></div>  <div className="login-box">
                <form onSubmit={handleUserLogin}>
                    <label htmlFor="login">Welcome!</label>
                    <input
                        type="text"
                        value={value}
                        id='login'
                        name='login'
                        onChange={(event) => setValue(event.target.value)}
                    />
                    <button type='submit'>Sign in</button>
                </form>
            </div><div></div>
        </section>
    );
}

// LoginBox.propTypes = {
//     setLogin: PropTypes.func,
//     login: PropTypes.any
// }
export default LoginBox;
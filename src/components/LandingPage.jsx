import {useState} from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PropTypes from "prop-types";

function LandingPage({user, setUser}) {
    const [signUp, setSignUp] = useState(false)
    const [login, setLogin] = useState(false)


    return (
        <section className='landing-box'>
        <h3>Welcome!</h3>

                    <button onClick={() => setLogin(!login)}>Login</button>
                    <button onClick={() => setSignUp(!signUp)}>Sign Up</button>
            {signUp &&
                    <SignUp
                        user={user}
                        setUser={setUser}/>
            }
            {login && <Login />}
        </section>

    );
}
LandingPage.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.any
}
export default LandingPage;
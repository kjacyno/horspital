import PropTypes from "prop-types";
import {useState} from "react";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";

function LandingPage({setUser}) {
    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);

    return (
        <section className='landing-box'>
            <h3>Welcome!</h3>
            {!signUp && (
                <button onClick={() => setLogin(!login)}>Login</button>
            )}
            {!login && (
                <button onClick={() => setSignUp(!signUp)}>Sign Up</button>
            )}
            {signUp && (<>
                    <button onClick={() => setSignUp(false)}>
                        Back
                    </button>
                    <SignUp
                        setUser={setUser}
                    />
                </>
            )
            }
            {login && (<>
                <button onClick={() => setLogin(false)}>
                    Back
                </button>
                <Login
                    setUser={setUser}
                />
            </>)
            }
        </section>
    )
}

LandingPage.propTypes = {
    setUser: PropTypes.any,
    user: PropTypes.any
}
export default LandingPage;
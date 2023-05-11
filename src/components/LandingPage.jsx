import {useState} from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PropTypes from "prop-types";

function LandingPage({user, setUser}) {
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
                        user={user}
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
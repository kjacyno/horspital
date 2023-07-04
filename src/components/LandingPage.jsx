import PropTypes from "prop-types";
import {lazy, Suspense, useState} from "react";
// import Login from "./Login.jsx";
// import SignUp from "./SignUp.jsx";
import horseShoeSVG from '/src/assets/horse-shoe.svg'

const SignUp = lazy(() => import('./SignUp.jsx'));
const Login = lazy(() => import("./Login.jsx"))

function LandingPage({setUser}) {
    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);

    return (
        <section className='landing-box'>
            <h3>Welcome!</h3>
            {!signUp && (
                <button className='btn' onClick={() => setLogin(!login)}>Login</button>
            )}
            {!login && (
                <button className='btn' onClick={() => setSignUp(!signUp)}>Sign Up</button>
            )}
            {signUp && (<>
                    <button className='btn' onClick={() => setSignUp(false)}>
                        Back
                    </button>
                    <Suspense fallback={<div className="icon-loader">
                        <img src={horseShoeSVG} alt='loader'/>
                    </div>}>
                    <SignUp
                        setUser={setUser}
                    /></Suspense>
                </>
            )
            }
            {login && (<>
                <button className='btn' onClick={() => setLogin(false)}>
                    Back
                </button>
                <Suspense fallback={<div className="icon-loader">
                    <img src={horseShoeSVG} alt='loader'/>
                </div>}> <Login
                    setUser={setUser}
                /></Suspense>
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
import {useState} from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PropTypes from "prop-types";

function LandingPage({user, setUser}) {
    const [signUp, setSignUp] = useState(false)
   const handleSignUp = () => {
       setSignUp(!signUp)
   }

    return (
        <section className='landing-box'>
        <h3>Welcome!</h3>
            {signUp ? (
                <SignUp
                    user={user}
                 setUser={setUser}/>
            ) : (
                <>
                    <button onClick={() => setSignUp(false)}>Login</button>
                    <button onClick={handleSignUp}>Sign Up</button>
                </>
            )}
             {/*Conditionally render the Login component*/}
            {!signUp && <Login />}
        </section>

    );
}
LandingPage.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.any
}
export default LandingPage;
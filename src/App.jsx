
import './sass/main.scss'
import {useEffect, useState} from "react";
import LoginBox from "./components/LoginBox.jsx";
import ClinicView from "./components/ClinicView.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {

    const [user, setUser] = useState('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

    }, []);
    console.log(user)
    return (
        <div className='container'>
            <header>
                <div><h1>Horspital <i className="fa-solid fa-house-medical"></i></h1></div>
                <div className="user-icon"><i className="fa-solid fa-hospital-user">{user && <h2>Hi, {user.displayName}.</h2>}</i></div>
            </header>
            {user ? (<ClinicView/>)
               : (<LoginBox
                    user={user}
                    setUser={setUser}
                />)
            }

        </div>
    )
}

export default App

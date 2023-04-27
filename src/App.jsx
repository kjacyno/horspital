// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyAdZQUiiagX4o2zoFJQRyjgrjWpV2DarK0",
//     authDomain: "equine-hospital-d9a54.firebaseapp.com",
//     projectId: "equine-hospital-d9a54",
//     storageBucket: "equine-hospital-d9a54.appspot.com",
//     messagingSenderId: "128788100150",
//     appId: "1:128788100150:web:8aafa4957cc31f5ad0d497"
// };
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

import './sass/main.scss'
import {useEffect, useState} from "react";
import LoginBox from "./components/LoginBox.jsx";

function App() {
    const [login, setLogin] = useState(true)
    useEffect(() => {
        setLogin(localStorage.getItem('userName'));

    }, []);

    return (
        <div className='container'>
            <header>
                <div><h1>Horspital <i className="fa-solid fa-house-medical"></i></h1></div>
                <div className="user-icon"><i className="fa-solid fa-hospital-user">{login && <h2>Hi, {login}.</h2>}</i></div>
            </header>
            {!login && <LoginBox
            />}

        </div>
    )
}

export default App

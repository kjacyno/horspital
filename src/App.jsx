import './sass/main.scss'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAdZQUiiagX4o2zoFJQRyjgrjWpV2DarK0",
    authDomain: "equine-hospital-d9a54.firebaseapp.com",
    projectId: "equine-hospital-d9a54",
    storageBucket: "equine-hospital-d9a54.appspot.com",
    messagingSenderId: "128788100150",
    appId: "1:128788100150:web:8aafa4957cc31f5ad0d497"
};
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

function App() {

  return (
      <div className='container'>
          <header>
              <h1>Horspital  <i className="fa-solid fa-house-medical"></i></h1>
          </header>
      </div>
  )
}

export default App

import './sass/main.scss'
import {useEffect, useState} from "react";
import LoginBox from "./components/LoginBox.jsx";
import ClinicView from "./components/ClinicView.jsx";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

function App() {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container maxWidth="xl">
                <header>

                    <div><h1 className='logo'>Horspital <i className="fa-solid fa-house-medical"></i></h1></div>


                        <div className="user-icon"><i className="fa-solid fa-hospital-user">{user &&
                            <h2>Hi, {user.displayName}.</h2>}</i></div>

                </header>

            <Grid container spacing={1}>
                <Grid xs>
                    <div></div>
                </Grid>
                <Grid xs={6}>
                    <div>{user ? (<ClinicView/>)
                        : (<LoginBox
                            user={user}
                            setUser={setUser}
                        />)
                    }</div>
                </Grid>
                <Grid xs>
                    <div></div>
                </Grid>
            </Grid>


        </Container>
    )
}

export default App

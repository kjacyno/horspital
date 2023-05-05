import './sass/main.scss'
import {useEffect, useState} from "react";
import ClinicView from "./components/ClinicView.jsx";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Header from "./components/Header.jsx";
import LandingPage from "./components/LandingPage.jsx";


function App() {

    const [user, setUser] = useState({});
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
             <Header
             user={user}
             setUser={setUser}
             />
            <Grid container spacing={1}>
                <Grid xs>
                    <div></div>
                </Grid>
                <Grid xs={6}>
                    <div>{user ? (<ClinicView/>)
                        // : (<SignUp
                        //     user={user}
                        //     setUser={setUser}
                        // />
                        : (<LandingPage
                            user={user}
                            setUser={setUser}
                            />
                        )
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

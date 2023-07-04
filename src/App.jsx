import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {lazy, Suspense, useEffect, useState} from "react";
import horseShoeSVG from './assets/horse-shoe.svg';
import Header from "./components/Header.jsx";
import './sass/main.scss';

function App() {
    const [user, setUser] = useState({});

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

    const Footer = lazy(() => import("./components/Footer.jsx"));
    const ClinicView = lazy(() => import("./components/ClinicView.jsx"));
    const LandingPage = lazy(() => import("./components/LandingPage.jsx"))

    return (
        <Container maxWidth='xl' sx={{
            '& .MuiContainer-root': {
                backgroundColor: 'transparent',
                height: '100%',
            },
            '@media screen and (max-width: 600px)': {
                padding: '2rem 0',
                margin: '0 auto'
            },
        }}>
            <Suspense fallback={<div className="icon-loader">
                <img src={horseShoeSVG} alt='loader'/>
            </div>}>
                <Header
                    user={user}
                    setUser={setUser}
                />

                <Grid container spacing={0}>
                    <Grid xs>
                        <div></div>
                    </Grid>
                    <Grid xs={12} sx={{
                        height: '100vh',
                    }}>
                        <div>
                            {user ? (
                                    <ClinicView
                                        user={user}
                                    />
                                )
                                : (
                                    <LandingPage
                                        setUser={setUser}
                                    />
                                )
                            }
                        </div>
                    </Grid>
                    <Grid xs>

                    </Grid>

                </Grid>
                <Footer/>

            </Suspense>
        </Container>
    )
}

export default App
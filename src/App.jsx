import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {lazy, Suspense, useEffect, useState} from "react";
import horseShoeSVG from './assets/horse-shoe.svg'
// import ClinicView from "./components/ClinicView.jsx";
// import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
// import LandingPage from "./components/LandingPage.jsx";
import './sass/main.scss'
const Footer = lazy(() => import("./components/Footer.jsx"))
const ClinicView = lazy(() => import("./components/ClinicView.jsx"))
const LandingPage = lazy(() => import("./components/LandingPage.jsx"))
function App() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="icon-loader">
            <img src={horseShoeSVG} alt='loader'/>
        </div>
    }

    return (<>
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
                <Header
                    user={user}
                    setUser={setUser}
                />

                <Grid container spacing={0} xs={{
                    marginBottom: '5rem'
                }}>
                    <Grid xs>
                        <div></div>
                    </Grid>
                    <Grid xs={12} sx={{
                        height: '100vh',
                        marginBottom: '15rem',
                        '& .MuiGrid2-root':{
                            '@media screen and(max-height: 600px)': {
                                marginBottom: '25rem'

                            }}
                    }}>
                        <div>
                            {user ? (
                                <Suspense fallback={<div className="icon-loader">
                                    <img src={horseShoeSVG} alt='loader'/>
                                </div>}>
                                    <ClinicView
                                        user={user}
                                    /></Suspense>
                                )
                                : (
                                    <Suspense fallback={<div className="icon-loader">
                                        <img src={horseShoeSVG} alt='loader'/>
                                    </div>}>
                                    <LandingPage
                                        setUser={setUser}
                                    /></Suspense>
                                )
                            }
                        </div>
                    </Grid>
                    <Grid xs>
                    </Grid>
                </Grid>
                <Suspense fallback={<div className="icon-loader">
                    <img src={horseShoeSVG} alt='loader'/>
                </div>}>
                <Footer/>
                </Suspense>
            </Container>
        </>
    )
}

export default App
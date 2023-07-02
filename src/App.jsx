import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import horseShoeSVG from './assets/horse-shoe.svg'
import ClinicView from "./components/ClinicView.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import LandingPage from "./components/LandingPage.jsx";
import './sass/main.scss'


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
            <img src={horseShoeSVG} alt='loeader'/>
        </div>
    }

    return (
        <Container maxWidth='xl' sx={{
            '& .MuiContainer-root': {
                backgroundColor: 'transparent'
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
            <Grid container spacing={0}>
                <Grid xs>
                    <div></div>
                </Grid>
                <Grid xs={12} >
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
                    <div></div>
                </Grid>
            </Grid>
            <Footer/>
        </Container>
    )
}

export default App
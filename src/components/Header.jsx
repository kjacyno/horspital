import PropTypes from "prop-types";
import * as React from 'react';
import {lazy} from 'react';
import {logOut} from "../firebase/usersData.js";
import '../sass/main.scss'

const Button = lazy(() => import('@mui/material/Button'));
const Menu = lazy(() => import('@mui/material/Menu'));
const MenuItem = lazy(() => {'@mui/material/MenuItem'});

function Header({user, setUser}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        logOut(setUser);
    };
    const handleCloseNoLogout = () => {
        setAnchorEl(null);
    };

    return (
        <header>
            <div className='logo'>
                <h1>
                    <i className="fa-solid fa-house-medical"></i>
                    Horspital
                </h1>
            </div>
            <div className="user-icon">
                {user && <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    > <i className="fa-solid fa-hospital-user"/>

                        <h2>Hi, {user.displayName}.</h2>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseNoLogout}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                            '& .MuiMenuItem-root': {
                                backgroundColor: 'transparent',
                                webkitBoxShadow: '1px 1px 5px 0px rgba(6,110,62,1)',
                                mozBoxShadow: '1px 1px 5px 0px rgba(6,110,62,1)',
                                boxShadow: '1px 1px 5px 0px rgba(6,110,62,1)'
                            },
                            '& .MuiPopover-paper': {
                                backgroundColor: 'transparent'

                            }
                        }}
                    >
                        <MenuItem id='logout' onClick={handleClose}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
                }
            </div>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.any,
    setUser: PropTypes.func
}
export default Header;
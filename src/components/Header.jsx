import PropTypes from "prop-types";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../sass/main.scss'
import {logOut} from "../database/usersData.js";


function Header({user, setUser}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
logOut(setUser)
    };

    return (
        <header>
            <div><h1 className='logo'>Horspital <i className="fa-solid fa-house-medical"></i></h1></div>
            <div className="user-icon">
                <i className="fa-solid fa-hospital-user">
                    {user && <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <h2>Hi, {user.displayName}.</h2>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                            {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                            <MenuItem id='logout' onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                    }
                </i>
            </div>

        </header>
    );
}

Header.propTypes = {
    user: PropTypes.any,
    setUser: PropTypes.func
}
export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';
// MaterialUI Elements
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as userAPI from '../../API/user';

export default function NavBar() {
    let loggedin = localStorage.getItem('userInformations') !== null;

    const handleLogOut = async () => {
        const res = userAPI.logout();
        console.log(res);
        localStorage.removeItem('userInformations');
        window.location.reload();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', flex: '1' } }}
                    >
                        <NavLink to="/"><i>Best of Logan</i></NavLink>
                    </Typography>

                    {loggedin &&
                        <MenuItem onClick={handleLogOut}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <LogoutIcon />
                            </IconButton>
                            <NavLink to="/">Logout</NavLink>
                        </MenuItem>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

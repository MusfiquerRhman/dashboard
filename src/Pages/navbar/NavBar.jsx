import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// MaterialUI Elements
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../Context APIs/userContext';


export default function NavBar(){
    const navigate = useNavigate();

    const { UserToken } = useContext(UserContext);

    const [loggedin, setLoggedin] = useState(UserToken !== '');

    useEffect(() => {
        setLoggedin(UserToken !== '')
    }, [UserToken]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogOut = async () => {
        setAnchorEl(null);
        handleMobileMenuClose();

    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        {loggedin &&
            <Box>
                <MenuItem onClick={handleMenuClose}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <AccountCircle />
                </IconButton>
                    <NavLink to="/">Profile</NavLink>
                </MenuItem>
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
            </Box>
        }

        {!loggedin &&
            <Box>
                <MenuItem onClick={handleMenuClose}><NavLink to="/login">Login</NavLink></MenuItem>
                <MenuItem onClick={handleMenuClose}><NavLink to="/registration">Register</NavLink></MenuItem>
            </Box>
        }        
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            
        {loggedin && (
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <ReceiptIcon />
                </IconButton>
                <NavLink to="/" >Cupons</NavLink>
            </MenuItem>
        )}

        {loggedin && (
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <AddBusinessIcon />
                </IconButton>
                <NavLink to="/" >Vendors</NavLink>
            </MenuItem>
        )}

        {loggedin && (
            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <CategoryIcon />
                </IconButton>
                <NavLink to="/" >categories</NavLink>
            </MenuItem>
        )}

        {loggedin && (
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <NavLink to="/" >Profile</NavLink>
            </MenuItem>
        )}

        {loggedin && (
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <LogoutIcon />
                </IconButton>
                <NavLink to="/" >Log Out</NavLink>
            </MenuItem>
        )}

        </Menu>
    );

    let accountButtonText = " Sign In"
    if(loggedin){
        accountButtonText= 'Profile'
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <NavLink to="/"><i>Dash-Board</i></NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                     {loggedin && ( 
                        <IconButton size="large" color="inherit">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                <NavLink to="" >Cupons</NavLink>
                            </Typography>
                        </IconButton>
                     )}

                    {loggedin && ( 
                        <IconButton size="large" color="inherit">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                <NavLink to="" >Vendor</NavLink>
                            </Typography>
                        </IconButton>
                     )}

                    {loggedin && ( 
                        <IconButton size="large" color="inherit">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                <NavLink to="" >Categories</NavLink>
                            </Typography>
                        </IconButton>
                     )}

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                            {accountButtonText}
                            </Typography>
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

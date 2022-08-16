import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// MaterialUI Elements
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
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
import * as userAPI from '../../API/user';

export default function NavBar(){
    let loggedin = localStorage.getItem('userInformations') !== null;

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

        const res = userAPI.logout();
        console.log(res);
        localStorage.removeItem('userInformations');
        window.location.reload();
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
                    <NavLink to="/profile">Profile</NavLink>
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
                <NavLink to="/" >Coupons</NavLink>
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
                <NavLink to="/vendors" >Vendors</NavLink>
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
                <NavLink to="/category" >categories</NavLink>
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
                <GroupsIcon />
                </IconButton>
                <NavLink to="/users" >Users</NavLink>
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
                <NavLink to="/profile" >Profile</NavLink>
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
                        <NavLink to="/"><i>Best of Logan</i></NavLink>
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
                                <NavLink to="" >Coupons</NavLink>
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
                                <NavLink to="/vendors" >Vendor</NavLink>
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
                                <NavLink to="/category" >Categories</NavLink>
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
                                <NavLink to="/users" >Users</NavLink>
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

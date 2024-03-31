import * as React from 'react';
import './navbar.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useFetcher, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userMode, setUserMode] = React.useState('Customer')
    const [avatarPic, setAvatarPic] = useState(0);
    const [isEmployee, setIsEmployee] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        let avatar;
        let isEmployee;
        let currentUser = localStorage.getItem("customerType")
        setUserMode(currentUser);
        if (currentUser === 'Customer') {
            isEmployee = false;
            avatar = '0'
        } else {
            isEmployee = true;
            avatar = '1'
        }
        setIsEmployee(isEmployee);
        setAvatarPic(avatar);
    }, [])
    
    const avatar = [
        {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Eo_circle_orange_letter-c.svg/640px-Eo_circle_orange_letter-c.svg.png"},
        {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Eo_circle_orange_letter-e.svg/2048px-Eo_circle_orange_letter-e.svg.png"}
    ]
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleModeChange = (e) => {
        let userMode;
        let isEmployee;
        let avatar;
        if (e === 'Customer') {
            userMode = 'Customer';
            isEmployee = false;
            avatar = '0'
        } else {
            userMode = 'Employee';
            isEmployee = true;
            avatar = '1'
        }
        setUserMode(userMode);
        setIsEmployee(isEmployee)
        setAvatarPic(avatar);
        navigate(`/`)

        localStorage.setItem("customerType", userMode)
    }

    return (
        <AppBar position="static" className='bar'>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
            <div onClick={()=>{navigate('/')}}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }} >
                    eHotel
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    </Menu>
                </Box>
            </div>

            { isEmployee && <div onClick={()=> navigate(`/hotels/register`)}>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Edit Database</Typography>
                </MenuItem>
            </div>}
            { isEmployee && <div onClick={()=> navigate(`/hotels/booking-to-renting`)}>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Booking to Renting</Typography>
                </MenuItem>
            </div>}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={avatar[avatarPic].src} />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <div onClick={() =>handleModeChange('Customer')}>
                            <Typography textAlign="center">Customer</Typography>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <div onClick={() =>handleModeChange('Employee')}>
                            <Typography textAlign="center">Employee</Typography>
                        </div>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
    }
    export default ResponsiveAppBar;
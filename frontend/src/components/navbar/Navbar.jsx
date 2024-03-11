import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookLogo from '../../assets/Logobook.jpg'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './Navbar.css'
import { logoutUser } from '../../features/Auth/Auth.action';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    if (location.pathname === "/signup" || location.pathname === "/") {
        return null
    }
    return (
        <Box sx={{ height: '52px' }} >
            <AppBar sx={{ backgroundColor: 'white', height: '52px', justifyContent: 'center', boxShadow: 'none' }}>
                <Toolbar sx={{ margin: 'auto' }}>
                    <Toolbar sx={{ alignItems: 'center', gap: '10px' }}>
                        <img src={BookLogo} alt='' className='iconsimage'></img>

                    </Toolbar>
                    <Toolbar sx={{ alignItems: 'center', gap: '20px' }} >
                        <NavLink activeClassName="active" to="/home" style={{ textDecoration: 'none' }}>
                            <Box className="logo-label" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: (theme) => theme.palette.grey[700], "&:hover": { color: "#191919" }, }}>
                                <HomeIcon sx={{ height: '24px', width: '24px' }} />
                                <Typography fontSize={'12px'} >Home</Typography></Box>
                        </NavLink>
                        {/* <NavLink activeClassName="active" to="/books" style={{ textDecoration: 'none' }}>
                            <Box className="logo-label" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: (theme) => theme.palette.grey[700], "&:hover": { color: "#191919" }, }}>
                                <MenuBookIcon sx={{ height: '24px', width: '24px' }} />
                                <Typography fontSize={'12px'} >Books</Typography></Box>
                        </NavLink> */}


                        <NavLink activeClassName="active" to="/admin" style={{ textDecoration: 'none' }}>
                            <Box className="logo-label" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: (theme) => theme.palette.grey[700], "&:hover": { color: "#191919" }, }}>
                                <AdminPanelSettingsIcon sx={{ height: '24px', width: '24px' }} />
                                <Typography fontSize={'12px'} >Admin</Typography></Box>
                        </NavLink>
                        <NavLink activeClassName="active" to="" style={{ textDecoration: 'none' }} onClick={async () => {
                            console.log("handlelogout1")
                            const res = await dispatch(logoutUser())
                            // dispatch(resetPost())
                            // dispatch(resetComment())
                            // // dispatch(resetNetwork())
                            // dispatch(resetLike())
                            // // console.log("handlelogout2")
                            if (res)
                                navigate('/')
                        }}>
                            <Box className="logo-label" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: (theme) => theme.palette.grey[700], "&:hover": { color: "#191919" }, }}>
                                < ExitToAppIcon sx={{ height: '24px', width: '24px', alignItems: 'center' }} />
                                <Typography fontSize={'12px'} align="center">Logout</Typography>
                            </Box>
                        </NavLink>
                    </Toolbar>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/Auth/Auth.action';
import { toggleerror } from '../../features/Auth/Auth.slice';


export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const logged = useSelector((state) => state.auth.logged)
    const isloading = useSelector((state) => state.auth.isloading)
    const error = useSelector((state) => state.auth.error)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hello", email, password)
        const data = {
            email: email,
            password: password
        }
        dispatch(loginUser(data));
    };
    useEffect(() => {
        if (error) {
            alert(`Error: ${error}`)
            dispatch(toggleerror())
        }
    }, [error])
    useEffect(() => {
        if (logged) {  //due to this line main khabi bhi login vali state me nhi ja skda without logout
            navigate('/home')
        }
    }, [logged])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        type='email'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Box component={'button'} onClick={() => {
                            navigate('/signup')
                        }} sx={{ background: 'none', color: 'rgb(49, 99, 190)', border: 'none', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
                            {"Don't have an account? Sign Up"}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
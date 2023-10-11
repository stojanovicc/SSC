import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "./actions/Auth";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://elfak.ni.ac.rs/">
                A&ATeam
            </Link>{'   '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn({ reloadHeader }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorText, setErrorText] = React.useState("");

    const history = useNavigate();
    const dispatch = useDispatch();

    const loginButtonHandler = async () => {
        const response = await dispatch(authActions.login(email, password));

        if (response.succeeded) {
            dispatch(authActions.checkIfLogged(reloadHeader))
            reloadHeader();
            history("/");
        }
        else {
            setErrorText("Username or password is incorrect")
        }


    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Prijavi se
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography color="error" variant="subtitle1">
                        {errorText}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        style={{backgroundColor: '#34495E'}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={loginButtonHandler}
                    >
                        Prijavi se
                    </Button>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <NavLink style={{ color: '#D22B2B' }}
                                to="/Register/student" >
                                {"Nemaš nalog? Registruj se"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
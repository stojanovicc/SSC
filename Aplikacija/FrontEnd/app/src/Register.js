import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoleToggle from './components/RoleToggle';
import { useState } from 'react';
import { register } from "./actions/Auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        A&A
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (data.get("password").length < 6) {
      setPassHelper("Šifra mora imati minimum 6 karaktera.");
    }
    else if (role === "student") {
      console.log("e")
      register(data.get("firstName"), data.get("lastName"), data.get("email"), data.get("username"), data.get("password"), 1).then(d => {
        if (d.succeeded) {
          navigate("/SignIn");
        }
      });
    }
    else if (role === "trener") {
      register(data.get("firstName"), data.get("lastName"), data.get("email"), data.get("username"), data.get("password"), 2).then(d => {
        if (d.succeeded) {
          navigate("/SignIn");
        }
      });
    }
    else if (role === "zaposleni") {
      register(data.get("firstName"), data.get("lastName"), data.get("email"), data.get("username"), data.get("password"), 3).then(d => {
        if (d.succeeded) {
          navigate("/SignIn");
        }
      });
    }
  };

  const [role, setRole] = useState(0);

  const navigate = useNavigate();

  const { role: registerRole } = useParams();

  const setStudentRole = () => {
    if (role != "student") {
      setRole("student");
    }

  }
  const setEmployerRole = () => {
    if (role != "trener") {
      setRole("trener");
    }

  }
  const setZaposleniRole = () => {
    if (role != "zaposleni") {
      setRole("zaposleni");
    }

  }

  React.useEffect(() => {
    if (registerRole === "trener")
      setRole("trener");
    else if (registerRole === "zaposleni")
      setRole("zaposleni");
    else if (registerRole === "student")
      setRole("student");
    else
      navigate("/Register/student")
  }, [])

  const [passHelper, setPassHelper] = useState("");

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registracija
        </Typography>
        <RoleToggle setStudent={setStudentRole} setEmployer={setEmployerRole} setZaposleni={setZaposleniRole} selected={role} />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            {
              (role == "trener") ?
              <React.Fragment>
              <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ime"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Prezime"
                name="lastName"
                autoComplete="family-name"
              />
              </Grid>
              </React.Fragment>
                :
                (role == "zaposleni") ?
              <React.Fragment>
              <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ime"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Prezime"
                name="lastName"
                autoComplete="family-name"
              />
              </Grid>
              </React.Fragment>
              :
                <React.Fragment>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Ime"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Prezime"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                </React.Fragment>
            }

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Adresa"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={passHelper}
                error={passHelper !== ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            style={{ backgroundColor: '#34495E'}}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Prijavi se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/SignIn" style={{ color: '#D22B2B' }} >
                Već imaš nalog? Prijavi se
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container >

  );
}
import { useState, useEffect } from "react";
import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {CssBaseline, Box, Divider, Grid, Button, Typography} from "@mui/material"
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import backgroundImage from './resources/pozadina.jpg';


export default function HomePage(props) {

  const navigate = useNavigate();

  const StyledApp = styled(Box)({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  });

  return (
    <Box>
      <StyledApp>
      <CssBaseline />
      <React.Fragment>

        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
          <Typography style={{ color: "#D22B2B", alignSelf: "center", fontSize: 50, fontWeight: 500, marginLeft: 20, marginTop: 20 }}>Studentski Sportski Centar</Typography>
        </Grid>
        <Grid fullwidth style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <Grid fullwidth style={{ display: "flex", flexDirection: "column", backgroundColor: "white", marginRight: 10, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
            <Typography fullwidth style={{ fontSize: 20, fontWeight: 500, color:"#ffffff", backgroundColor: "#D22B2B", width: "100%" }}> STUDENT </Typography>
            <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + "/resources/student.png"}
                sx={{ width: 200, height: 200, marginRight: 4, justifySelf: "flex-end" }}
              />
              <Grid style={{ alignSelf: "center", width: "50%", marginBottom: 5, marginLeft: 20, marginTop: 10  }}>
                <Typography style={{ fontSize: 20 }}>Registruj se kao student i: </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Izaberi sport koji ćeš da treniraš </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Učlani se u tim </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Zakaži trening</Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Prijavi se takmičenje </Typography>
                <Button size="large" href="http://localhost:3000/Register/student" variant="contained" style={{backgroundColor: "#34495E", marginTop: 40, marginBottom: 20, marginRight: 25 }}>Registruj se</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid fullwidth style={{ display: "flex", flexDirection: "column", backgroundColor: "white", marginRight: 10, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
            <Typography fullwidth style={{ fontSize: 20, fontWeight: 500, color:"#ffffff", backgroundColor: "#34495E", width: "100%" }}> TRENER </Typography>
            <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap-reverse", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Grid style={{ alignSelf: "center", width: "50%", marginBottom: 5, marginLeft: 20, marginTop: 10 }}>
                <Typography style={{ fontSize: 20 }}>Registruj se kao trener i: </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Postavi raspored treninga  </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Vodi evidenciju o zakazanim treninzima </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Ažuriraj termine treninga</Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Formiraj timove </Typography>
                <Button size="large" href="http://localhost:3000/Register/trener" variant="contained" style={{ order: 100, backgroundColor: "#D22B2B", marginTop: 40, marginBottom: 20, marginRight: 15 }}>Registruj se</Button>
              </Grid>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + "/resources/treneri.png"}
                sx={{ width: 200, height: 200, marginRight: 1, justifySelf: "flex-end" }}
              />

            </Grid>
          </Grid>
          <Grid fullwidth style={{ display: "flex", flexDirection: "column", backgroundColor: "white", marginRight: 10, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
            <Typography fullwidth style={{ fontSize: 20, fontWeight: 500, color:"#ffffff", backgroundColor: "#34495E", width: "100%" }}> ZAPOSLENI </Typography>
            <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap-reverse", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Grid style={{ alignSelf: "center", width: "50%", marginBottom: 5, marginLeft: 20, marginTop: 10 }}>
                <Typography style={{ fontSize: 20 }}>Registruj se kao zaposleni i:  </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Postavljaj predstojeća takmičenja </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Vodi evidenciju o članarinama  </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Vodi evidenciju o prijavljenim takmičarima  </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Ažuriraj takmičenja  </Typography>
                <Button size="large" href="http://localhost:3000/Register/zaposleni" variant="contained" style={{ order: 100, backgroundColor: "#34495E", marginTop: 40, marginBottom: 20, marginRight: 15 }}>Registruj se</Button>
              </Grid>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + "/resources/zaposleni.png"}
                sx={{ width: 200, height: 200, marginRight: 1, justifySelf: "flex-end" }}
              />

            </Grid>
          </Grid>
        </Grid>
        <Grid fullwidth style={{ marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "10%" }}>
          <Typography style={{ color: "#D22B2B", fontSize: 20, fontWeight: 800, marginLeft: 20, }}> <InfoIcon></InfoIcon> Već imaš nalog?</Typography>
          <Button size="large" href="http://localhost:3000/SignIn" variant="outlined" style={{ color: "#D22B2B", marginLeft: 20 }}>Prijavi se</Button>
        </Grid>
        <Divider style={{ marginTop: 10, marginBottom: 20 }}></Divider>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
        </Grid>
      </React.Fragment>
      </StyledApp>
    </Box>
  );
}
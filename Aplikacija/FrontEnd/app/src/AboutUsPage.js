//to be implemented
import React, { useState, useEffect } from "react";
import {Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography, Chip, Link,} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import StarRateIcon from "@mui/icons-material/StarRate";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function AboutUsPage(props) {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4, mt: 2 }} variant="outlined">

          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 40, color: "#bbbbbb" }}
            >
              UPOZNAJTE{" "}
              <Link style={{ color: "#D22B2B", textDecoration: "none" }}>
                SSC
              </Link>
            </Typography>
          </Grid>
          <Grid>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 28, color: "#bbbbbb" }}
            >
              I tim koji stoji iza njega
            </Typography>
          </Grid>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> KO SMO MI? </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >
              STUDENTSKI SPORTSKI CENTAR. STUDENTSKI SPORTSKI CENTAR OBUHVATA SLEDECE SPORTOVE: ATLETIKA, GIMNASTIKA, PLIVANJE,
              KOSARKA, FUDBAL, ODBOJKA I VATERPOLO. STUDENTSKI SPORTSKI CENTAR ORGANIZUJE RAZNA TAKMICENJA.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> ŠTA MI NUDIMO? </Divider>

            <Chip sx={{ m: 1 }} label="IZABERI SPORT" />
            <Chip sx={{ m: 1 }} label="PRONAĐI SVOG TRENERA" />
            <Chip sx={{ m: 1 }} label="ZAKAŽI TRENING" />
            <Chip sx={{ m: 1 }} label="TAKMIČI SE" />
            <Chip sx={{ m: 1 }} label="PRIJAVI SE NA TAKMIČENJE" />
            <Chip sx={{ m: 1 }} label="PRATI NOVOSTI O TAKMIČENJIMA" />
            <Chip sx={{ m: 1 }} label="PLAĆANJE ČLANARINE" />
            <Chip sx={{ m: 1 }} label="OTKAŽI TRENING" />
            <Chip sx={{ m: 1 }} label="PRATI RASPORED TRENINGA" />
            <Chip sx={{ m: 1 }} label="ODUSTANI OD TAKMIČENJA" />
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> KO SU ČLANOVI NAŠEG TIMA?</Divider>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Grid
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: "#D22B2B",
                  }}
                >
                  Head Back Developer
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/andjela.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  style={{
                    fontWeight: 1000,
                    fontSize: 19,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  Andjela Stojanovic
                </Typography>
                <Typography>
                  Anđela vodi naš tim i odgovorna je za dizajniranje korisničkog interfejsa naše web aplikacije, 
                  kao i za njen razvoj mnogih funckionalnosti. Ona je veran član A&A tima od njegovog postojanja 2023..
                </Typography>
                <Grid
                  container
                  style={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <FacebookIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <InstagramIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <TwitterIcon />{" "}
                  </Button>
                </Grid>
              </Grid>
              <Divider
                style={{ marginLeft: 20, marginRight: 20 }}
                orientation="vertical"
                flexItem
              />
              <Grid
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: "#D22B2B",
                  }}
                >
                  Head Front Developer
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/anastasija.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  style={{
                    fontWeight: 1000,
                    fontSize: 19,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  {" "}
                  Anastasija Trajkovic
                </Typography>
                <Typography>
                  Anastasija je još jedan član od dva vodeća programera A&A tima. Zadužena je za dizajn i 
                  razvoj funkcionalnosti koje nudi naša web aplikacija. Ona je takođe član A&A tima od njegovog postojanja 2023.
                </Typography>
                <Grid
                  container
                  style={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <FacebookIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <InstagramIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#D22B2B" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <TwitterIcon />{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 3 }}>
              {" "}
              ŽELITE DA NAS KONTAKTIRATE NA DRUŠTVENIM MREŽAMA?{" "}
            </Divider>
            <Grid
              container
              style={{
                marginTop: 3,
                marginLeft: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Button
                sx={{ m: 1, borderRadius: 50, backgroundColor: "#34495E" }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <FacebookIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50, backgroundColor: "#34495E" }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <InstagramIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50, backgroundColor: "#34495E" }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <TwitterIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50, backgroundColor: "#34495E" }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <LinkedInIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50, backgroundColor: "#34495E" }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <YouTubeIcon />{" "}
              </Button>
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    </Container>
  );
}

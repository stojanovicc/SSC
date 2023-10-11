import React, { useState, useEffect } from "react";
import {Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography, Chip} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import background from "./resources/cardtrener.jpg";
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { useNavigate } from "react-router-dom";

export default function Treners(props) {

  const [search, setSearch] = useState("");

  const getTreners = async () => {
    const response = await fetch(
      "http://localhost:7240/Trener/GetTreners",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setTrenerData(fetchData.treners);
    }
  };

  const [trenerData, setTrenerData] = useState({
    treners: [
      {
        imeT: "",
        prezimeT: "",
        slika: "",
        email: ""
      },
    ],
  });

  useEffect(() => {
    getTreners();
  }, []);

  const navigate = useNavigate();

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">

          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item xs={12} style={{ padding: "10px", maxWidth: 500 }}>
              <TextField
                onChange={(event) => { setSearch(event.target.value) }}
                id="outlined-basic-email"
                label="Pretraži sportske trenere"
                variant="outlined"
                fullWidth
              />
              <style>
                {
                  `
              .red {color: red}
              .blue {background-color: "#618fba"}
            `
                }
              </style>
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >

            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {trenerData.treners
              .filter(c => c.imeT.toLowerCase().includes(search.toLowerCase()))
              .map((card, index) => {

                return (
                  <Grid item key={index}>
                    <Card style={{ width: 380, height: 230,cursor:"pointer" }} onClick={() => { navigate("/Trener/" + card.id) }}>

                      <CardMedia />

                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "flex-end",
                          height: 200,
                          backgroundImage: `url(${background})`
                        }}
                        spacing={3}

                      >
                        <Button style={{ height: 32, marginLeft: 30, marginBottom: 30 }} disabled></Button>
                        {
                          (<Button disabled style={{ marginLeft: 5, height: 32, marginBottom: 30}} >
                           
                          </Button>)
                        }
                        <Avatar
                          variant="rounded"
                          alt="Remy Sharp"
                          src={process.env.PUBLIC_URL + "/resources/" + card.slika}
                          sx={{ width: 110, height: 110, marginRight: 1, marginTop: 14, justifySelf: "flex-end" }}
                        />
                      </Grid>
                      <Divider light />
                      <CardActions style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Typography style={{ textAlign: "center", fontWeight: "1000", marginLeft: 7, fontSize: 20 }}><SportsVolleyballIcon /> {card.imeT + " " + card.prezimeT}</Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}

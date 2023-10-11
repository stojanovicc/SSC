import React, { useState, useEffect } from 'react';
import { Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from '@mui/material/colors';
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import ComboBox from './ComboBox';
import { useNavigate } from "react-router-dom";
import TakmicenjaCard from './components/ZaposleniInfo/TakmicenjaCard';
import SmallInternshipCard from './components/StudentProfile/SmallInternshipCard';


export default function Takmicenja(props) {

    const [takmicenjeData, setTakmicenjeData] = useState(null);

    const [backgroundColor, setColor] = useState("blue");


    const getTakmicenje = async () => {
        const response = await fetch(
            "http://localhost:7240/SportskiSavez/GetTakmicenja",
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setTakmicenjeData(fetchData.takmicenje);
        }
    };

    const [search, setSearch] = useState("");

    useEffect(() => {
        getTakmicenje();
        console.log("a");
    }, []);

    console.log(takmicenjeData);

    const navigate = useNavigate();

    return (

        <>
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                    justifyContent="center"
                >
                    <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Grid container xs={12} md={6} lg={6} style={{ display: "flex", flexDirection: "row", padding: "10px", width: "90%", justifyContent: "center", alignItems: "center" }}>
                            <TextField style={{ marginBottom: 5 }}
                                onChange={(event) => { setSearch(event.target.value) }}
                                id="outlined-basic-email"
                                label="Pretraži po nazivu takmičenja"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    {takmicenjeData != null && (
                        <Grid container spacing={2}>
                            {takmicenjeData.takmicenje
                                .filter(c => c.nazivTakmicenja.toLowerCase().includes(search.toLowerCase()))
                                .map((cards, index) => {
                                    const { nazivTakmicenja, mestoOdrzavanja, datumOdrzavanja, sports, id } = cards;
                                    console.log(cards);
                                    return (
                                        <Grid item xs={12} md={6} lg={4}>
                                            <SmallInternshipCard
                                                index={index}
                                                nazivTakmicenja={nazivTakmicenja}
                                                mestoOdrzavanja={mestoOdrzavanja}
                                                datumOdrzavanja={datumOdrzavanja}
                                                sports={sports}
                                                link={"/Takmicenje/" + id}
                                                takmicenjeID={id}
                                            />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    )}
                </Paper>

            </React.Fragment>

        </ >
    );
}




//2.nacin-RADII FETCHOVANJE SA OVOM METODOM
// import React, { useState, useEffect } from 'react';
// import { Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

// const Takmicenja = () => {
//   const [takmicenja, setTakmicenja] = useState([]);

//   useEffect(() => {
//     const fetchTakmicenja = async () => {
//       try {
//         const response = await fetch('http://localhost:7240/SportskiSavez/PreuzmiTakmicenja'); // Zamijenite URL_TAKMICENJA sa stvarnim URL-om za dohvat podataka o takmičenjima
//         const data = await response.json();
//         setTakmicenja(data);
//       } catch (error) {
//         console.error('Greška pri dohvatanju takmičenja:', error);
//       }
//     };

//     fetchTakmicenja();
//   }, []);

//   return (
//     <div>
//       <h1>Lista takmičenja</h1>
//       <ul>
//         {takmicenja.map((takmicenje) => (
//             <div key={takmicenje.id}>
//                     <Typography variant="body1">Naziv: {takmicenje.nazivTakmicenja}</Typography>
//                     <Typography variant="body1">Datum: {takmicenje.datumSatnica}</Typography>
//                     <Typography variant="body1">Mesto: {takmicenje.mestoOdrzavanja}</Typography>
                   
//             </div>
         
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Takmicenja;

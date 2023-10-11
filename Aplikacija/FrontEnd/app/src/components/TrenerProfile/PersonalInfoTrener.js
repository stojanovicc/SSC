import { Button, Divider, Grid, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import AddressIcon from '@mui/icons-material/HomeRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportChips from "../TakmicenjePage/SportChips";

export default function PersonalInfoTrener({ cvInfo, type }) {

    const [info, setInfo] = useState(cvInfo ?? {
        name: "Name",
        lastName: "Lastname",
        email: "student@example.com",
        city: "City",
        address: "Street Name 99",
        phone: "+3812345678",
        picture: "",
        sports: [
            { id: 1, label: "Atletika" }
        ]   
    });
    const navigate = useNavigate();


    return (
        <Grid container sx={{ width: 1 }}>
            <Grid item container xs={12} sx={{ mb: 3 }}>
                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Osnovni podaci</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            type === "public" ? <></> :
                                <>
                                    <Typography align="left" ml={4} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                        <AddressIcon />
                                        {"Adresa:"}
                                    </Typography>
                                    <Typography align="left" ml={7} >{info.address}</Typography>
                                    <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                        <LocationCityIcon />
                                        {"Grad:"}
                                    </Typography>
                                    <Typography align="left" ml={7} >{info.city}</Typography>
                                    <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                        <PhoneIcon />
                                        {"Broj telefona:"}
                                    </Typography>
                                    <Typography align="left" ml={7} >{info.phone}</Typography>
                                </>
                        }
                    </AccordionDetails>
                </Accordion >
                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Sport</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ ml: 2, mt: -1 }}>
                            <SportChips sports={info.sports.map(s => ({ naziv: s.label }))} variant="outlined" />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            {
                type === "public" ? <></> :
                    <Grid item container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Button
                                style={{backgroundColor: '#34495E'}}
                                variant="contained"
                                size="large"
                                onClick={() => { navigate("/PersonalInfoTrenerCreator") }}
                            >Promeni osnovne podatke</Button>
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}
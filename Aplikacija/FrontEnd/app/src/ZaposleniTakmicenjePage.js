import { Paper, CssBaseline, Box, Button, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab, Typography, CircularProgress, Avatar, Grid, useTheme} from '@mui/material';
import PrijavljeniTakmicari from './components/TakmicenjePage/ApplicantList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SportChips from './components/TakmicenjePage/SportChips';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { NavLink, useParams } from 'react-router-dom';
import ApplicantList from './components/TakmicenjePage/ApplicantList';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditTakmicenje from './components/TakmicenjePage/EditTakmicenje';

export default function ZaposleniTakmicenjePage() {

    const theme = useTheme();
    const { id } = useParams();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                sx={{ width: 1 }}
            >
                {value === index && (
                    <Box sx={{ p: 3, width: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getTakmicenje = async () => {
        const response = await fetch("http://localhost:7240/SportskiSavez/GetTakmicenje/" + id, {
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                setTakmicenje(data.takmicenje);
            }
        }
    }

    const handleApply = async () => {
        const response = await fetch("http://localhost:7240/Student/ApplyToTakmicenje/" + id, {
            credentials: "include",
            method: "PUT"
        });
        const data = await response.json();
        if (data.succeeded) {

        } else {
            alert("Vi ste vec prijavljeni.");
        }
        setApplied(true);
    }

    const handleCancel = async () => {
        const response = await fetch("http://localhost:7240/Student/DeleteTakmicenje/" + id, {
            credentials: "include",
            method: "DELETE"
        });
        const data = await response.json();
        if (data.succeeded) {
            console.log("Takmicenje je uspesno otkazan.");
        } else {
            console.log("Nije moguce povuci prijavu za takmicenje.");
        }
        setApplied(false);
    }

    const checkApplication = async () => {
        const response = await fetch("http://localhost:7240/Student/GetPrijava/" + id, {
            credentials: "include"
        });
        const data = await response.json();
        if (data.succeeded) {
            setApplied(data.applied);
        }
    }

    const [takmicenje, setTakmicenje] = useState({
        takmicenjeOwner: false,
        id: "",
        nazivTakmicenja: "",
        mestoOdrzavanja: "",
        datumOdrzavanja: "",
        sports: []
    })
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        getTakmicenje();
        checkApplication();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">{takmicenje.nazivTakmicenja}</Typography>

                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <LocationOnIcon style={{ color: theme.palette.error.main, marginRight: 5 }} /> {takmicenje.mestoOdrzavanja} </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <QueryBuilderIcon style={{ color: theme.palette.error.main, marginRight: 5 }} /> {takmicenje.datumOdrzavanja}  </Typography>
                    <SportChips sports={takmicenje.sports} />
                    <Box sx={{ display: takmicenje.takmicenjeOwner ? "flex" : "none", mt: 2 }}>
                        <EditTakmicenje
                            currentNaziv={takmicenje.nazivTakmicenja}
                            currentMesto={takmicenje.mestoOdrzavanja}
                            currentVreme={takmicenje.datumOdrzavanja}
                            takmicenjeId={takmicenje.id}
                            update={getTakmicenje}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Prijavi se" />
                        <Tab label="Prijavljeni takmicari" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Typography align="center" style={{ fontSize: 23 }} >
                        <NavLink to={"/Zaposleni/" + takmicenje.employerId} style={{ color: '#f50057' }}>
                            {takmicenje.employerName}
                        </NavLink>
                    </Typography>
                    {
                        applied ?
                            <Box>
                                <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
                                    <CheckCircleOutlineRoundedIcon color={"success"} />
                                    Uspešno ste se prijavi na ovo takmičenje!
                                </Typography>
                                <Typography>
                                    <Button
                                        style={{color:'#D22B2B'}}
                                        variant="outlined"
                                        sx={{ display: localStorage.getItem("role") === "Student" ? "" : "none" }}
                                        onClick={handleCancel}
                                    >
                                    Odustani od prijave za takmicenje</Button>    
                                </Typography>
                            </Box>
                            :
                            <Button
                                style={{backgroundColor: '#34495E'}}
                                variant="contained"
                                sx={{ display: localStorage.getItem("role") === "Student" ? "" : "none" }}
                                onClick={handleApply}
                            >
                                Prijavi se na takmicenje
                            </Button>
                    }
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>NAZIV TAKMIČENJA </Divider>
                    <Typography align="center">{takmicenje.nazivTakmicenja}</Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>SPORTOVI </Divider>
                    <SportChips sports={takmicenje.sports} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ApplicantList takmicenjeSports={takmicenje.sports.map(s => s.naziv)} takmicenjeId={id} />
                </TabPanel>
            </Box>
        </Container >
    );
}


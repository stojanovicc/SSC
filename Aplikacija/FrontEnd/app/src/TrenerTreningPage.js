import { Paper, CssBaseline, Box, Button, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Typography, CircularProgress, Avatar, Grid, useTheme } from '@mui/material';
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
import ZakazaniStudenti from './components/TreningForms/ZakazaniStudenti';
import { DateRange } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';


export default function TrenerTreningPage() {

    const theme = useTheme();
    const { id } = useParams(); // id takmicenja iz URL

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

    const getTrening = async () => {
        const response = await fetch("http://localhost:7240/Trener/GetTrening/" + id, {
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                setTrening(data.trening);
            }
        }
    }

    const handleApply = async () => {
        const response = await fetch("http://localhost:7240/Student/ApplyToTrening/" + id, {
            credentials: "include",
            method: "PUT"
        });
        const data = await response.json();
        if (data.succeeded) {
            console.log("Trening je uspesno zakazan.");
        } else {
            alert("Vi ste vec zakazali trening.");
        }
        setApplied(true);
    }

    const handleCancel = async () => {
        const response = await fetch("http://localhost:7240/Student/DeleteTrening/" + id, {
            credentials: "include",
            method: "DELETE"
        });
        const data = await response.json();
        if (data.succeeded) {
            console.log("Trening je uspesno otkazan.");
        } else {
            console.log("Nije moguce otkazati trening.");
        }
        setApplied(false);
    }

    const checkApplication = async () => {
        const response = await fetch("http://localhost:7240/Trener/GetPrijavaTrening/" + id, {
            credentials: "include"
        });
        const data = await response.json();
        if (data.succeeded) {
            setApplied(data.applied);
        }
    }

    const [trening, setTrening] = useState({
        internshipOwner: false,
        id: "",
        mesto: "",
        vreme: "",
        datum: "",
        trenerName: "",
        // sports: [],
        trenerId: ""
    })
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        getTrening();
        checkApplication();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}>
                {/* <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src={process.env.PUBLIC_URL + "/resources/" + takmicenje.picture} alt="Logo" sx={{ width: 140, height: 140 }} />
                </Grid> */}
                <Grid item xs={12} md={10}>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <LocationOnIcon style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {trening.mesto} </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <DateRange style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {trening.datum} </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <QueryBuilderIcon style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {trening.vreme}  </Typography>
                    {/* <SportChips sports={takmicenje.sports} /> */}

                    {/* <Box sx={{ display: takmicenje.internshipOwner ? "flex" : "none", mt: 2 }}>
                        <EditTakmicenje
                            currentNaziv={takmicenje.nazivTakmicenja}
                            currentMesto={takmicenje.mestoOdrzavanja}
                            currentVreme={takmicenje.datumOdrzavanja}
                            takmicenjeId={takmicenje.id}
                            update={getTakmicenje}
                        />
                    </Box> */}
                </Grid>
            </Grid>

            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Zakaži trening" />
                        <Tab label="Zakazani treninzi" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Typography align="center" style={{ fontSize: 23 }} >
                        <NavLink to={"/Trener/" + trening.trenerId} style={{ color: '#f50057' }}>
                            {trening.trenerName}
                        </NavLink>
                    </Typography>
                    {
                        applied ?
                            <Box>
                                <Typography variant="body3" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
                                    <CheckCircleOutlineRoundedIcon color={"success"} />
                                    Uspešno ste zakazali trening!
                                </Typography>
                                <Typography>
                                    <Button
                                        style={{color:'#D22B2B'}}
                                        variant="outlined"
                                        sx={{ display: localStorage.getItem("role") === "Student" ? "" : "none" }}
                                        onClick={handleCancel}
                                    >
                                        Otkaži trening</Button>
                                        
                                </Typography>
                            </Box>
                            :
                            <Button
                                style={{backgroundColor:'#34495E'}}
                                variant="contained"
                                sx={{ display: localStorage.getItem("role") === "Student" ? "" : "none" }}
                                onClick={handleApply}
                            >
                                Zakaži trening
                            </Button>
                    }
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>Mesto treninga </Divider>
                    <Typography align="center">{trening.mesto}</Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>Vreme treninga </Divider>
                    <Typography align="center">{trening.vreme}</Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>Datum treninga </Divider>
                    <Typography align="center">{trening.datum}</Typography>
                </TabPanel>
                {/* ovo pogledaj */}
                <TabPanel value={value} index={1}>
                    <ZakazaniStudenti treningId={id} />
                </TabPanel>
            </Box>
        </Container>
    );
}


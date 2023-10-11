import React, { useState, useEffect } from "react";
import {Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography, useTheme, Avatar, Tab, Tabs, Input, TextField, IconButton} from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DraftsIcon from "@mui/icons-material/Drafts";
import ApartmentIcon from "@mui/icons-material/Apartment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TakmicenjaCard from "./components/ZaposleniInfo/TakmicenjaCard";
import ExperienceCard from "./components/ZaposleniInfo/ExperienceCard";
import { useParams } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SmallInternshipCard from "./components/StudentProfile/SmallInternshipCard";
import EditZaposleni from './components/ZaposleniProfile/EditZaposleni';
import DodavanjeClanarine from "./components/ClanarinaForms/DodavanjeClanarine";
import EvidencijaClanarina from "./components/ClanarinaForms/EvidencijaClanarina";

export default function ZaposleniInfoPage(props) {
    const { id } = useParams();
    const theme = useTheme();

    const role = localStorage.getItem("role");

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

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
                {value === index && <Box sx={{ p: 3, width: 1 }}>{children}</Box>}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getEmployerInfo = async () => {
        console.log(id)
        const response = await fetch(
            "http://localhost:7240/Zaposleni/GetZaposleniInfo" + (id != undefined ? "?employerId=" + id : ""),
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setEmployerData(fetchData.employer);
        }
    };

    //const [skillData, setSkillData] = useState([]);
    const [employerData, setEmployerData] = useState({
        imeZ: "",
        prezimeZ: "",
        slika: "",
        email: "",
        takmicenjes: [
            {
                id: "",
                nazivTakmicenja: "",
                mestoOdrzavanja: "",
                datumOdrzavanja: "",
                sports: []
            },
        ]
    });

  

    useEffect(() => {
        getEmployerInfo();
    }, []);

    const update = () => {
        getEmployerInfo();
        props.reloadHeader();
    }

    return (
        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    md={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Avatar
                        src={process.env.PUBLIC_URL + "/resources/" + employerData.slika}
                        sx={{ width: 140, height: 140 }}
                    />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant="h3" align="left">{employerData != undefined ? employerData.imeZ + " " + employerData.prezimeZ: ""}</Typography>
                    <Typography align="left">{employerData != undefined ? employerData.userName : ""}</Typography>
                    <Typography align="left">{employerData != undefined ? employerData.email : ""}</Typography>
                    <Box sx={{ display: employerData.id !== localStorage.getItem("id") ? "none" : "flex", mt: 1 }}>
                        <EditZaposleni
                            currentPicture={employerData.slika}
                            currentName={employerData.imeZ}
                            currentLastName={employerData.prezimeZ}
                            update={update}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        position: "sticky",
                        top: 65,
                        mt: 4,
                        zIndex: 20,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Tabs
                        value={value}
                        variant="scrollable"
                        scrollButtons
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Dodavanje takmičenja" />
                        <Tab label="Evidencija o članarinama" />
                    </Tabs>
                </Box>
                {/* prijave na takmicenja */}
                <TabPanel value={value} index={0}>
                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                                style={{
                                    width: "80%",
                                    justifySelf: "center",
                                    alignSelf: "center",
                                }}
                                autoFocus
                                key="searchkey"
                                onChange={(event) => { setSearch(event.target.value) }}
                                variant="standard"
                                label="Search"
                                value={search}
                            ></TextField>
                        </Grid>
                        <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
                            <Grid container spacing={3} sx={{ pb: 2 }}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Button
                                        style={{backgroundColor: '#34495E'}}
                                        variant="contained"
                                        startIcon={<AddCircleRoundedIcon />}
                                        onClick={() => navigate("/TakmicenjeCreator")}
                                    >
                                        Dodaj takmičenje
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* Internship Cards */}
                            {
                                <Grid container spacing={3}>
                                    {employerData.takmicenjes
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
                            }
                        </Grid>
                    </Box>
                </TabPanel>
               {/* clanarine */}
                <TabPanel value={value} index={1}>
                   {/* <NavLink to="/DodavanjeClanarine"> 
                            <Button style={{color: '#34495E'}} >
                                Dodaj članarine
                            </Button>
                   </NavLink> */}
                   <Typography variant="body3">Dodavanje članarine</Typography>
                    <Divider/>
                        <DodavanjeClanarine/>
                    <Divider/>
                    <Typography variant="body3">
                        <Divider/>
                        Evidencija članarina
                    </Typography>
                        <EvidencijaClanarina/>
                    {/* </Divider> */}
                    
                </TabPanel>
            </Box>
        </Container>
    );
}

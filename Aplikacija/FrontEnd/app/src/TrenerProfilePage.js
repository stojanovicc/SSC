import { Paper, CssBaseline, Box, Button, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Typography, CircularProgress, Avatar, Grid, Stack } from '@mui/material';
import EditTrenerProfileDialog from './components/TrenerProfile/EditTrener';
import PersonalInfoTrener from './components/TrenerProfile/PersonalInfoTrener';
import { NavLink, useParams } from 'react-router-dom';
import FormiranjeTima from './TimForms/FormiranjeTima';
import Treninzi from './Treninzi';
import Timovi from './Timovi';

export default function TrenerProfilePage({ type, reloadHeader }) {

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

    const [info, setInfo] = useState({
        name: "",
        lastName: "",
        email: "",
        city: "",
        address: "",
        phone: "",
        picture: "",
        sports: []
    });

    const { id } = useParams();

    const getInfo = async () => {
        const response = await fetch("http://localhost:7240/PersonalInfo/GetPersonalInfoTrener?trenerId=" + (id != undefined ? id : ""), {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData)
            
            setInfo(fetchData.cv);
        }
    }

    const update = () => {
        getInfo();
        reloadHeader();
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src={process.env.PUBLIC_URL + "/resources/" + info.picture} sx={{ width: 140, height: 140 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">{info != undefined ? info.name + " " + info.lastName : ""}</Typography>
                    <Typography align="left">{info != undefined ? info.userName : ""}</Typography>
                    <Typography align="left">{info != undefined ? info.email : ""}</Typography>
                    <Box sx={{ display: type === "public" ? "none" : "flex", mt: 1 }}>
                        <EditTrenerProfileDialog
                            currentPicture={info.picture}
                            currentLastName={info.lastName}
                            currentName={info.name}
                            update={update}
                        />
                    </Box>
                </Grid>

            </Grid>
            <Box>
                <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Osnovni podaci" />
                    <Tab label="Treninzi" sx={{ display: type === "public" ? "none" : "" }} />
                    <Tab label="Raspored treninga" />
                    <Tab label="Timovi" sx={{ display: type === "public" ? "none" : "" }} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <PersonalInfoTrener cvInfo={info} type={type} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Stack direction="column" spacing={2}>
                        <NavLink to="/RasporedTreninga">
                            <Button style={{backgroundColor: '#34495E'}} variant="contained">Dodaj termine treninga</Button>
                        </NavLink>
                        <Divider />
                        <NavLink to="/ListaTreninga">
                            <Button style={{backgroundColor: '#34495E'}} variant="contained">Ažuriranje i brisanje treninga</Button>
                        </NavLink>
                        <Divider />
                        {/* <NavLink to="/ZakazaniTreninzi">
                            <Button variant="contained">Zakazani treninzi</Button>
                        </NavLink> */}
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Treninzi />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <FormiranjeTima />
                    <NavLink to="/Timovi">
                        <Button style={{color: '#34495E'}} variant='outlined'>
                            Članovi timova
                        </Button>
                    </NavLink>
                </TabPanel>
            </Box>
        </Container>
    );
}

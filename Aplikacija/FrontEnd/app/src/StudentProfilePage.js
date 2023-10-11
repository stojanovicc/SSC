import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab, Typography, CircularProgress, Avatar, Grid, Divider} from '@mui/material';
import EditStudentProfileDialog from './components/StudentProfile/EditStudent';
import PersonalInfo from './components/StudentProfile/PersonalInfo';
import { useParams } from 'react-router-dom';
import ListaTreninga from './components/TreningForms/ListaTreninga';
import TrenerTreningPage from './TrenerTreningPage';
import Treninzi from './Treninzi';
import Timovi from './Timovi';
import { NavLink } from 'react-router-dom';
import PlaceneClanarine from './components/ClanarinaForms/PlatiClanarinu';

export default function StudentProfilePage({ type, reloadHeader }) {

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
        sports: [],
        fakultet: []
    });

    const { id } = useParams();

    const getInfo = async () => {
        const response = await fetch("http://localhost:7240/PersonalInfo/GetPersonalInfoStudent?studentId=" + (id != undefined ? id : ""), {
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
                        <EditStudentProfileDialog
                            currentPicture={info.picture}
                            currentLastName={info.lastName}
                            currentName={info.name}
                            update={update}
                        />
                    </Box>
                </Grid>

            </Grid>
            <Box >
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Osnovni podaci" />
                        {/* <Tab label="Takmicenja" sx={{ display: type === "public" ? "none" : "" }} /> */}
                        {/* <Tab label="Treninzi" sx={{ display: type === "public" ? "none" : "" }} /> */}
                        <Tab label="Timovi" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Clanarine" sx={{ display: type === "public" ? "none" : "" }} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <PersonalInfo cvInfo={info} type={type} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Divider />
                            <Typography variant="body3">Upisi se u tim</Typography>
                            <Timovi/>
                        <Divider />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Divider />
                        <PlaceneClanarine/>
                        <Divider />
                    </TabPanel>
            </Box>
        </Container >
    );
}

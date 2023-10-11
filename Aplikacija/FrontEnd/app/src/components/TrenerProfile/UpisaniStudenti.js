import { Checkbox, FormGroup, FormControlLabel, Chip, Button, Grid, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

export default function UpisaniStudenti({ timId, timSports }) {

    const [applicants, setApplicants] = useState([ //dobija se iz fetcha na osnovu internshipId
       
    ]);

    const [minMatch, setMinMatch] = useState(0);
    const [sortDirection, setSortDirection] = useState("none");
    const [searchVal, setSearchVal] = useState("");
    const [accepted, setAccepted] = useState(true);
    const [applied, setApplied] = useState(true);
    const [denied, setDenied] = useState(true);
    const [finished, setFinished] = useState(false);

    const getApplicants = async () => {
        const response = await fetch("http://localhost:7240/Trener/GetAppliedStudentsTim/" + timId, {
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                console.log(data)
                setApplicants(data.tim.applicants);
            }
        }
    }

    useEffect(() => {
        getApplicants();
    }, [])      

    const navigate = useNavigate();

    return (
        <Grid container sx={{ width: 1 }}>
            {
                applicants.length == 0 ?
                    <Typography>Nema upisanih članova </Typography> :
                    <Grid item container xs={12} spacing={3}>

                    </Grid> 
                    }
            

            <Grid item container xs={12}>

                {
                    applicants
                        .filter((a) =>
                            (a.name + " " + a.lastName).toLowerCase().includes(searchVal.toLowerCase())
                        )
                        
                        .map((applicant, index) => (
                            <Accordion variant="outlined" sx={{ width: 1 }} key={index}>
                                <AccordionSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
                                        <Typography>
                                            {applicant.name + " " + applicant.lastName}
                                        </Typography>

                                    </Box>
                                    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Button
                                    style={{backgroundColor:'#34495E'}}
                                    variant="contained"
                                    onClick={() => { navigate("/Student/" + applicant.id) }}
                                >Prikaži profil studenta</Button>
                                </Grid>
                                </AccordionSummary>  
                            </Accordion >
                            
                        ))

                }


            </Grid>

        </Grid>
    )
}
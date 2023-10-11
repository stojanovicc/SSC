import { Grid, Typography, Button, Divider, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextInputField from './TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ChipTransferList from './ChipTransferList';

export default function Requirements() {

    const { values } = useFormikContext();

    useEffect(() => {
        getSports();
        console.log("a");
    }, []);


      const [sportData, setSportData] = useState([]);
      const getSports = async () => {
        const response = await fetch(
          "http://localhost:7240/PersonalInfo/GetSports",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const fetchData = await response.json();
          console.log(fetchData);
          setSportData(fetchData.sports
            .map((cards, index) =>
            ({
              id: cards.id,
              label: cards.naziv
            })
            ));
            console.log(sportData);
        }
      };

    return (
        <React.Fragment>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} >
                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <Divider sx={{ mb: 3 }} >Sportovi na takmicenju</Divider>
                        <ChipTransferList chipData={sportData} leftTitle={"Izaberi sport:"} rightTitle={"Dodati sportovi:"} fieldName={"sports"} />
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}

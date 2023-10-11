import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from './TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ChipTransferList from './ChipTransferList';

export default function AboutForm() {

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
      setSportData(fetchData.sports);
    }
  };

  return (
    <React.Fragment>
      <Paper
        sx={{ p: 3, mb: 4 }}
        variant="outlined"
      >
        <Divider sx={{ mb: 3 }} >Novo takmicenje</Divider>
        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid item xs={12}>
            <TextInputField name={"nazivTakmicenja"} label={"Naziv"} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextInputField name={"mestoOdrzavanja"} label={"Mesto odrzavanja"} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextInputField name={"datumOdrzavanja"} label={"Datum odrzavanja"} fullWidth />
          </Grid>
         

          <Grid container spacing={3} sx={{ mb: 4 }}>

            <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>


              <Divider sx={{ mb: 3 }} >Sportovi na takmicenju</Divider>
              <ChipTransferList chipData={sportData} leftTitle={"Izaberite sport:"} rightTitle={"Dodati sportovi:"} fieldName={"sports"} />
            </Grid >
          </Grid >
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

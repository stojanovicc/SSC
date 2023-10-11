import React, { useState } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from '../FormFields/TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function PersonalInfoForm() {

    const { values } = useFormikContext();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <AccountCircleRoundedIcon sx={{ mr: 2 }} />
                Podaci
            </Typography>
            <Paper
                sx={{ p: 3, mb: 4 }}
                variant="outlined"
            >
                <Divider sx={{ mb: 3 }} >OSNOVNI PODACI</Divider>
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"address"} label={"Adresa:"} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"city"} label={"Grad:"} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputField type="tel" name={"phone"} label={"Broj telefona:"} fullWidth />
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}

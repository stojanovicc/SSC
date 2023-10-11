import React, { useState } from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function InfoForm() {

    const { values } = useFormikContext();
    console.log(values);

    return (
        <React.Fragment>
            <Paper
                sx={{ p: 3, pt: 0, mb: 4 }}d
            >
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} >
                    </Grid>
                </Grid>
            </Paper >
        </React.Fragment >
    );
}

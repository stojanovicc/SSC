import { Grid, Typography, Button, Divider, Box } from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { FieldArray, useFormikContext } from 'formik';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

import ChipTransferList from './ChipTransferList';

export default function SportForm({sportData}) {

    const { values } = useFormikContext();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <SportsBasketballIcon sx={{ mr: 2 }} />
                Sport
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <Divider sx={{ mb: 3 }} >SPORTS</Divider>
                        <ChipTransferList chipData={sportData} leftTitle={"Izaberite sport:"} rightTitle={"Dodati sportovi:"} fieldName={"sports"} />
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}

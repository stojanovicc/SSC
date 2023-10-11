import React, { useState } from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import TextInputField from '../FormFields/TextInputField';
import Card from './Card';
import { FieldArray, useFormikContext } from 'formik';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

export default function FakultetForm() {

    const { values } = useFormikContext();
    console.log(values);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <SchoolIcon sx={{ mr: 2 }} />
                Fakultet
            </Typography>
            <Paper
                sx={{ p: 3, pt: 3, mb: 4 }}
                variant="outlined"
            >
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} >
                        <FieldArray
                            name="fakultet"
                            render={(arrayHelpers) => (
                                <React.Fragment>
                                    {
                                        values.fakultet.map((fak, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Card
                                                        name={`fakultet[${index}]`}
                                                        onDelete={() => {
                                                            arrayHelpers.remove(index);
                                                        }}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <Button onClick={() => {
                                        arrayHelpers.push({
                                            nazivFakulteta: "",
                                            grad: "",
                                            univerzitet: ""
                                        });
                                    }
                                    }
                                        style={{color: '#34495E'}}
                                        variant="outlined"
                                        startIcon={<SchoolIcon />}
                                    >
                                        Dodaj fakultet
                                    </Button>
                                </React.Fragment>
                            )}
                        >
                        </FieldArray>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}

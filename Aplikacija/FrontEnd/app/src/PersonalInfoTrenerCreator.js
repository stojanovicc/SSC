import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {Stepper, Step, StepLabel, Button, Typography, CircularProgress} from '@mui/material';
import { Formik, Form } from 'formik';
import PersonalInfoForm from './components/PersonalInfoTrenerForms/PersonalInfoForm';
import SportForm from './components/PersonalInfoTrenerForms/SportForm';
import InfoForm from './components/PersonalInfoTrenerForms/InfoForm';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom'

const steps = ['Osnovni podaci', 'Sport', 'Sacuvaj'];

export default function PersonalInfoTrenerCreator() {
    
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInfoForm />
            case 1:
                return <SportForm sportData={sportData}/>;
            case 2:
                return <InfoForm />;
            default:
                return <React.Fragment>Not Found</React.Fragment>;
        }
    }

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        
        const response = await fetch("http://localhost:7240/PersonalInfo/CreatePersonalInfoTrener", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        actions.setSubmitting(false);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setActiveStep(activeStep + 1);
        }
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    const getSports = async () => {
        const response = await fetch("http://localhost:7240/PersonalInfo/GetSports", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData)

            setSportData(fetchData.sports);
        }
    }

    const getPersonalInfoData = async () => {
        const response = await fetch("http://localhost:7240/PersonalInfo/GetPersonalInfoTrener", {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
         
            setPersonalInfoData(fetchData.cv);
        }
    }

    const [sportData, setSportData] = useState([]);
    const [PersonalInfoData, setPersonalInfoData] = useState({
        phone: "",
        address: "",
        city: "",
        sport: []
    });

    const personalInfoValidationSchema = Yup.object().shape({
        phone: Yup.string().required("Broj telefona je obavezan."),
        address: Yup.string().required("Adresa je obavezna."),
        city: Yup.string().required("Grad je obavezan.")
    })

    useEffect(() => {
        getSports();
        getPersonalInfoData();
    }, []);

    return (
        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Osnovni podaci
                </Typography>
                <Stepper activeStep={activeStep} >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {
                                    <Typography sx={{
                                        display: { xs: 'none', md: "block" },
                                    }}>
                                        {label}
                                    </Typography>
                                }
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <>
                            <Typography component="h1" variant="h2" align="center">
                                <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: 100, mt: 10 }} />
                                <br />
                                Osnovni podaci su uspešno promenjeni!
                            </Typography>
                        </>
                    ) : (
                        <Formik
                            initialValues={
                                PersonalInfoData
                            }
                            enableReinitialize
                            validationSchema={personalInfoValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"personalInfoForm"}>
                                    {_renderStepContent(activeStep)}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            mb: 5
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} style={{color: '#34495E'}} variant="outlined" size="large" >
                                                Back
                                            </Button>
                                        )}
                                        <div >
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                style={{backgroundColor: '#34495E'}}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                            >
                                                {isLastStep ? 'Sacuvaj izmene' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{ ml: 4 }}

                                                />
                                            )}
                                        </div>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>

        </Container >
    );
}

import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {Stepper, Step, StepLabel, Button, Typography, CircularProgress} from '@mui/material';
import { Formik, Form } from 'formik';
import PersonalInfoForm from './components/PersonalInfoStudentForms/PersonalInfoForm';
import ProfessionalSkillsForm from './components/PersonalInfoStudentForms/SportForm';
import WorkExperienceForm from './components/PersonalInfoStudentForms/FakultetForm';
import InfoForm from './components/PersonalInfoStudentForms/InfoForm';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';

const steps = ['Osnovni podaci', 'Sport', 'Fakultet', 'Sacuvaj'];

export default function PersonalInfoCreator() {
    
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInfoForm />
            case 1:
                return <ProfessionalSkillsForm sportData={sportData} />;
            case 2:
                return <WorkExperienceForm />;
            case 3:
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
        const response = await fetch("http://localhost:7240/PersonalInfo/CreatePersonalInfoStudent", {
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
            setSkillData(fetchData.sports);
        }

    }

    const getCvData = async () => {
        const response = await fetch("http://localhost:7240/PersonalInfo/GetPersonalInfoStudent", {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
            setCvData(fetchData.cv);
        }

    }

    const [sportData, setSkillData] = useState([]);
    const [cvData, setCvData] = useState({
        phone: "",
        address: "",
        city: "",
        fakultet: [],
        sports: [],
    });

    const cvValidationSchema = Yup.object().shape({
        phone: Yup.string().required("Broj telefona je obavezan."),
        address: Yup.string().required("Adresa je obavezna."),
        city: Yup.string().required("Grad je obavezan."),
        fakultet: Yup.array()
            .of(
                Yup.object().shape({
                    nazivFakulteta: Yup.string().required("Naziv fakulteta je obavezan."),
                    grad: Yup.string().required("Grad fakulteta je obavezan."),
                    univerzitet: Yup.string().required("Univerzitet fakulteta je obavezan.")
                })
            )
    })

    useEffect(() => {
        getSports();
        getCvData();
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
                                cvData
                            }
                            enableReinitialize
                            validationSchema={cvValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"cvForm"}>
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

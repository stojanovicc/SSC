// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Container, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';

// const ListaTreninga = () => {
//   const [trainings, setTrainings] = useState([]);
//   const [selectedTraining, setSelectedTraining] = useState(null);
//   const [updatedTraining, setUpdatedTraining] = useState({});
//   const [deletedTrainingId, setDeletedTrainingId] = useState(null);

//   useEffect(() => {
//     fetchTrainings();
//   }, [deletedTrainingId]);

//   const fetchTrainings = async () => {
//     try {
//       const response = await axios.get('http://localhost:7240/Trener/GetTreninzi'); // Promenite URL prema vašem API endpointu
//       setTrainings(response.data);
//     } catch (error) {
//       console.error('Error fetching trainings:', error);
//     }
//   };

//   const handleEdit = (training) => {
//     setSelectedTraining(training);
//     setUpdatedTraining({ ...training });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`http://localhost:7240/Trener/AzurirajTrening/${selectedTraining.id}`, updatedTraining); // Promenite URL prema vašem API endpointu
//       setTrainings(trainings.map((training) => (training.id === selectedTraining.id ? response.data : training)));
//       setSelectedTraining(null);
//       setUpdatedTraining({});
//     } catch (error) {
//       console.error('Error updating training:', error);
//     }
//   };

//   const handleDelete = async (trainingId) => {
//     try {
//       await axios.delete(`http://localhost:7240/Trener/ObrisiTrening/${trainingId}`); // Promenite URL prema vašem API endpointu
//       setDeletedTrainingId(trainingId);
//     } catch (error) {
//       console.error('Error deleting training:', error);
//     }
//   };

//   return (
//     <Container>
//       <h1 >Raspored treninga</h1>
//       <Grid container spacing={2}>
//         {trainings.map((training) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={training.id}>
//             <ListItem>
//               {selectedTraining && selectedTraining.id === training.id ? (
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Mesto"
//                       value={updatedTraining.mesto}
//                       onChange={(e) => setUpdatedTraining({ ...updatedTraining, mesto: e.target.value })}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Datum"
//                       type="date"
//                       value={updatedTraining.datum}
//                       onChange={(e) => setUpdatedTraining({ ...updatedTraining, datum: e.target.value })}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Vreme"
//                       type="text"
//                       value={updatedTraining.vreme}
//                       onChange={(e) => setUpdatedTraining({ ...updatedTraining, vreme: e.target.value })}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button variant="contained" onClick={handleUpdate} fullWidth>
//                       Sačuvaj
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <ListItemText primary={`Mesto: ${training.mesto}`} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText primary={`Datum: ${training.datum}`} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText primary={`Vreme: ${training.vreme}`} />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Button variant="contained" onClick={() => handleEdit(training)} fullWidth>
//                       Ažuriraj
//                     </Button>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Button variant="contained" color="error" onClick={() => handleDelete(training.id)} fullWidth>
//                       Obriši
//                     </Button>
//                   </Grid>
//                 </Grid>
//               )}
//             </ListItem>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ListaTreninga;



//2.nacin
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)`
  padding-top: 40px;
  text-align: center;
`;

const StyledHeading = styled('h1')`
  margin-bottom: 20px;
`;

const StyledListItem = styled(ListItem)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const ListaTreninga = () => {
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [updatedTraining, setUpdatedTraining] = useState({});
  const [deletedTrainingId, setDeletedTrainingId] = useState(null);

  useEffect(() => {
    fetchTrainings();
  }, [deletedTrainingId]);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Trener/PreuzmiTreninge'); // Promenite URL prema vašem API endpointu
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const handleEdit = (training) => {
    setSelectedTraining(training);
    setUpdatedTraining({ ...training });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:7240/Trener/AzurirajTrening/${selectedTraining.id}`, updatedTraining); // Promenite URL prema vašem API endpointu
      setTrainings(trainings.map((training) => (training.id === selectedTraining.id ? response.data : training)));
      setSelectedTraining(null);
      setUpdatedTraining({});
    } catch (error) {
      console.error('Error updating training:', error);
    }
  };

  const handleDelete = async (trainingId) => {
    try {
      await axios.delete(`http://localhost:7240/Trener/ObrisiTrening/${trainingId}`); // Promenite URL prema vašem API endpointu
      setDeletedTrainingId(trainingId);
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  return (
    <StyledContainer>
      <StyledHeading>Raspored treninga</StyledHeading>
      <Grid container spacing={2}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={training.id}>
            <StyledListItem>
              {selectedTraining && selectedTraining.id === training.id ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <StyledTextField
                      label="Mesto"
                      value={updatedTraining.mesto}
                      onChange={(e) => setUpdatedTraining({ ...updatedTraining, mesto: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      label="Datum"
                      type="date"
                      value={updatedTraining.datum}
                      onChange={(e) => setUpdatedTraining({ ...updatedTraining, datum: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      label="Vreme"
                      type="text"
                      value={updatedTraining.vreme}
                      onChange={(e) => setUpdatedTraining({ ...updatedTraining, vreme: e.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledButton style={{backgroundColor: '#34495E'}} variant="contained" onClick={handleUpdate} fullWidth>
                      Sačuvaj
                    </StyledButton>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ListItemText primary={`Mesto: ${training.mesto}`} />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText primary={`Datum: ${training.datum}`} />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText primary={`Vreme: ${training.vreme}`} />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton style={{backgroundColor: '#34495E'}} variant="contained" onClick={() => handleEdit(training)} fullWidth>
                      Ažuriraj
                    </StyledButton>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton variant="contained" color="error" onClick={() => handleDelete(training.id)} fullWidth>
                      Obriši
                    </StyledButton>
                  </Grid>
                </Grid>
              )}
            </StyledListItem>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default ListaTreninga;

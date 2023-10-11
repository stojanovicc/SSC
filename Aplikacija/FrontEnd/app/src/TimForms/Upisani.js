// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { styled } from '@mui/system';

// const StyledContainer = styled(Container)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding-top: 40px;
//   text-align: center;
// `;

// const StyledList = styled(List)`
//   width: 100%;
//   max-width: 600px;
//   margin-top: 20px;
//   padding: 0;
// `;

// const StyledListItem = styled(ListItem)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 16px;
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   margin-bottom: 8px;
// `;

// const StyledButton = styled(Button)`
//   margin-top: 16px;
// `;

// const Upisani = () => {
//   const [tims, setTrainings] = useState([]);
//   const [selectedTim, setSelectedTraining] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     fetchTrainings();
//   }, []);

//   const fetchTrainings = async () => {
//     try {
//       const response = await axios.get('http://localhost:7240/Trener/GetTimovi'); // Promenite URL prema vašem API endpointu
//       setTrainings(response.data);
//     } catch (error) {
//       console.error('Error fetching trainings:', error);
//     }
//   };

//   const fetchStudents = async (treningId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:7240/Trener/GetPrijavljeniZaTim/${treningId}`); // Promenite URL prema vašem API endpointu
//       setStudents(response.data);
//       setLoading(false);
//       setDialogOpen(true);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const handleCloseDialog = () => {
//     setSelectedTraining(null);
//     setStudents([]);
//     setDialogOpen(false);
//   };

//   return (
//     <StyledContainer>
//       <Typography variant="body3" gutterBottom>
//         Upisani studenti 
//       </Typography>
//       {tims.length === 0 ? (
//         <CircularProgress />
//       ) : (
//         <StyledList>
//           {tims.map((tim) => (
//             <StyledListItem key={tim.id}>
//               <ListItemText primary={`Naziv: ${tim.nazivTima}`} />
//               <ListItemText primary={`Sport: ${tim.sport}`} />
//               <ListItemText primary={`Fakultet: ${tim.fakultet}`} />
//               <StyledButton variant="contained" onClick={() => fetchStudents(tim.id)}>
//                 Prijavljeni korisnici
//               </StyledButton>
//             </StyledListItem>
//           ))}
//         </StyledList>
//       )}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Prijavljeni korisnici</DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <CircularProgress />
//           ) : students.length === 0 ? (
//             <Typography>Nema upisanih studenata za izabrani tim.</Typography>
//           ) : (
//             <List>
//               {students.map((student) => (
//                 <ListItem key={student.id}>
//                   <ListItemText primary={`${student.imeStudenta} ${student.prezimeStudenta}`} />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Zatvori</Button>
//         </DialogActions>
//       </Dialog>
//     </StyledContainer>
//   );
// };

// export default Upisani;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  text-align: center;
`;

const StyledList = styled(List)`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  padding: 0;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const Upisani = () => {
  const [tims, setTrainings] = useState([]);
  const [selectedTim, setSelectedTraining] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Trener/GetTimovi'); // Promenite URL prema vašem API endpointu
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const fetchStudents = async (treningId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:7240/Trener/GetPrijavljeniZaTim/${treningId}`); // Promenite URL prema vašem API endpointu
      setStudents(response.data);
      setLoading(false);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedTraining(null);
    setStudents([]);
    setDialogOpen(false);
  };

  return (
    <StyledContainer>
      {/* <Typography variant="body1" gutterBottom>
        Upisani studenti
      </Typography> */}
      {tims.length === 0 ? (
        <CircularProgress />
      ) : (
        <StyledList>
          {tims.map((tim) => (
            <StyledListItem key={tim.id}>
              <ListItemText primary={`Naziv: ${tim.nazivTima}`} />
              <ListItemText primary={`Sport: ${tim.sport}`} />
              <ListItemText primary={`Fakultet: ${tim.fakultet}`} />
              <StyledButton variant="contained" onClick={() => fetchStudents(tim.id)}>
                Prijavljeni korisnici
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Prijavljeni korisnici</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : students.length === 0 ? (
            <Typography>Nema upisanih studenata za izabrani tim.</Typography>
          ) : (
            <List>
              {students.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText primary={`${student.imeStudenta} ${student.prezimeStudenta}`} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Upisani;

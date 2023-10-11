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

const EvidencijaClanarina = () => {
  const [clanarine, setClanarine] = useState([]);
  const [selectedClanarina, setSelectedClanarina] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchClanarine();
  }, []);

  const fetchClanarine = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Zaposleni/PreuzmiClanarine'); // Promenite URL prema vašem API endpointu
      setClanarine(response.data);
    } catch (error) {
      console.error('Error fetching clanarines:', error);
    }
  };

  const fetchStudents = async (clanarinaId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:7240/Zaposleni/GetPlaceneClanarine/${clanarinaId}`); // Promenite URL prema vašem API endpointu
      setStudents(response.data);
      setLoading(false);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedClanarina(null);
    setStudents([]);
    setDialogOpen(false);
  };

  return (
    <StyledContainer>
      {/* <Typography variant="body1" gutterBottom>
        Upisani studenti
      </Typography> */}
      {clanarine.length === 0 ? (
        <CircularProgress />
      ) : (
        <StyledList>
          {clanarine.map((clanarina) => (
            <StyledListItem key={clanarina.id}>
              <ListItemText primary={`Mesec: ${clanarina.mesec}`} />
              <ListItemText primary={`Cena: ${clanarina.cena}`} />
              <StyledButton variant="outlined" onClick={() => fetchStudents(clanarina.id)}>
                Studenti koji su platili članarinu
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
      )}
      <Dialog open={dialogOpen} style={{color: '#34495E'}} onClose={handleCloseDialog}>
        <DialogTitle style={{color: '#34495E'}}>Studenti koji su platili clanarinu</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : students.length === 0 ? (
            <Typography>Nema studenta koji su platili clanarinu.</Typography>
          ) : (
            <List>
              {students.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText primary={`${student.ime} ${student.prezime}`} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button style={{color: '#34495E'}} onClick={handleCloseDialog}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default EvidencijaClanarina;

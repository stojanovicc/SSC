import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, List, ListItem, ListItemText, Container, Grid } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Divider } from 'antd';

const ZakazivanjeTreninga = () => {
  const [treningList, setTreningList] = useState([]);
  const [zakazaniTrening, setZakazaniTrening] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imeStudenta, setImeStudenta] = useState('');
  const [prezimeStudenta, setPrezimeStudenta] = useState('');
  const [success, setSuccess] = useState(false);
  const [prijave, setPrijave] = useState([]);

  useEffect(() => {
    fetchTreningList();
    fetchPrijave();
  }, []);

  async function fetchTreningList() {
    try {
      const response = await axios.get('http://localhost:7240/Trener/GetTreninzi');
      setTreningList(response.data);
    } catch (error) {
      console.log('Greška prilikom fetch-ovanja liste treninga:', error);
    }
  }

  async function fetchPrijave() {
    try {
      const response = await axios.get('http://localhost:7240/Student/GetPrijave');
      setPrijave(response.data);
    } catch (error) {
      console.log('Greška prilikom fetch-ovanja prijava:', error);
    }
  }

  const zakaziTrening = async (treningId) => {
    setZakazaniTrening(treningId);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const prijava = {
        treningID: zakazaniTrening,
        imeStudenta,
        prezimeStudenta,
      };

      await axios.post('http://localhost:7240/Student/ZakaziTrening', prijava);
      setImeStudenta('');
      setPrezimeStudenta('');
      setSuccess(true);
      fetchPrijave(); // Ažuriraj listu prijava nakon uspešnog zakazivanja
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setZakazaniTrening(null);
  };

  if (success) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h3">Uspešno zakazivanje treninga</Typography>
        {/* Dodajte sadržaj nove stranice o uspešnom zakazivanju */}
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="body3" align="center">
        <Divider/>
        Zakazivanje treninga
      </Typography>
      <List style={{ marginBottom: '20px' }}>
        {prijave.map((prijava) => (
          <ListItem key={prijava.id}>
            <ListItemText primary={`${prijava.imeStudenta} ${prijava.prezimeStudenta}`} />
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {treningList.map((trening) => (
          <Grid item xs={12} key={trening.id}>
            <div
              style={{
                padding: '10px',
                border: `1px solid ${zakazaniTrening === trening.id ? '#f50057' : '#ccc'}`,
                borderRadius: '5px',
                backgroundColor: zakazaniTrening === trening.id ? '#f5f5f5' : '#fff',
              }}
              onMouseEnter={() => setZakazaniTrening(trening.id)}
              onMouseLeave={() => setZakazaniTrening(null)}
            >
              <Typography variant="body1">Datum: {trening.datum}</Typography>
              <Typography variant="body1">Vreme: {trening.vreme}</Typography>
              <Typography variant="body1">Mesto: {trening.mesto}</Typography>

              {zakazaniTrening === trening.id ? (
                <div>
                  {showForm ? (
                    <form onSubmit={handleFormSubmit}>
                      <TextField
                        type="text"
                        label="Ime studenta"
                        value={imeStudenta}
                        onChange={(e) => setImeStudenta(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        type="text"
                        label="Prezime studenta"
                        value={prezimeStudenta}
                        onChange={(e) => setPrezimeStudenta(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <Button variant="contained" type="submit" fullWidth>
                        Potvrdi
                      </Button>
                      <Button variant="contained" onClick={handleFormCancel} fullWidth>
                        Odustani
                      </Button>
                    </form>
                  ) : (
                    <Button variant="contained" onClick={() => setShowForm(true)} fullWidth>
                      Zakaži trening
                    </Button>
                  )}
                </div>
              ) : (
                <Button variant="contained" onClick={() => zakaziTrening(trening.id)} fullWidth>
                  Zakaži trening
                </Button>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ZakazivanjeTreninga;


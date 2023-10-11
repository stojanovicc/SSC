import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const Upisivanje = () => {
  const [timovi, setTimovi] = useState([]);
  const [selectedTim, setSelectedTim] = useState(null);
  const [imeStudenta, setIme] = useState('');
  const [prezimeStudenta, setPrezime] = useState('');
  const [prijavaId, setPrijavaId] = useState(null);

  useEffect(() => {
    const fetchTimovi = async () => {
      try {
        const response = await fetch('http://localhost:7240/Trener/GetTimovi');
        const data = await response.json();
        setTimovi(data);
      } catch (error) {
        console.error('Pogreška prilikom dohvaćanja timova:', error);
      }
    };

    fetchTimovi();
  }, []);

  const handleTimClick = (timId) => {
    setSelectedTim(timId);
  };

  const handleImeChange = (e) => {
    setIme(e.target.value);
  };

  const handlePrezimeChange = (e) => {
    setPrezime(e.target.value);
  };

  const handlePrijavaSubmit = async () => {
    if (!imeStudenta || !prezimeStudenta || !selectedTim) {
      return;
    }

    try {
      const response = await fetch('http://localhost:7240/Student/UpisiSe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timId: selectedTim,
          imeStudenta: imeStudenta,
          prezimeStudenta: prezimeStudenta,
        }),
      });
      const data = await response.json();
      setPrijavaId(data.ID);
    } catch (error) {
      console.error('Pogreška prilikom slanja prijave:', error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
          <Typography variant="body3" align="center" gutterBottom>
            Lista timova
          </Typography>
          <List>
            {timovi.map((tim) => (
              <ListItem
                key={tim.id}
                button
                onClick={() => handleTimClick(tim.id)}
                style={{
                  border: '1px solid #ccc',
                  marginBottom: '1rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedTim === tim.id ? '#f5f5f5' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  width: '90%',
                  margin: '0 auto',
                  borderRadius: '5px',
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ variant: 'body3' }}
                  primary={tim.nazivTima}
                  secondary={`${tim.sport} - ${tim.fakultet}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {selectedTim && (
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="body3" align="center" gutterBottom>
              Prijava za tim
            </Typography>
            <form onSubmit={handlePrijavaSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
              <Grid container spacing={2} style={{ maxWidth: '300px' }}>
                <Grid item xs={12}>
                  <TextField
                    label="Ime"
                    variant="outlined"
                    fullWidth
                    value={imeStudenta}
                    onChange={handleImeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Prezime"
                    variant="outlined"
                    fullWidth
                    value={prezimeStudenta}
                    onChange={handlePrezimeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="body3" fullWidth>
                    Pošalji prijavu
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      )}

      {prijavaId && (
        <Grid item xs={12}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="body3" align="center" gutterBottom>
              Prijava uspešno poslana! ID nove prijave za tim je = {prijavaId}
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default Upisivanje;






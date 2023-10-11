import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const PlatiClanarinu = () => {
  const [clanarine, setClanarine] = useState([]);
  const [selectedClanarina, setSelectedClanarina] = useState(null);
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [brojKartica, setBrojKartice] = useState('');
  const [cvv, setCvv] = useState('');
  const [prijavaId, setPrijavaId] = useState(null);

  useEffect(() => {
    const fetchClanarine = async () => {
      try {
        const response = await fetch('http://localhost:7240/Zaposleni/PreuzmiClanarine');
        const data = await response.json();
        setClanarine(data);
      } catch (error) {
        console.error('Pogreška prilikom dohvaćanja clanarina:', error);
      }
    };

    fetchClanarine();
  }, []);

  const handleClanarineClick = (clanarinaId) => {
    setSelectedClanarina(clanarinaId);
  };

  const handleImeChange = (e) => {
    setIme(e.target.value);
  };

  const handlePrezimeChange = (e) => {
    setPrezime(e.target.value);
  };
  const handleBrojKarticeChange = (e) => {
    setBrojKartice(e.target.value);
  };
  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handlePrijavaSubmit = async () => {
    if (!ime|| !prezime || !brojKartica || !cvv  || !selectedClanarina) {
      return;
    }

    try {
      const response = await fetch('http://localhost:7240/Student/PlatiClanarinu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clanarinaId: selectedClanarina,
          ime: ime,
          prezime: prezime,
          brojKartica: brojKartica,
          cvv: cvv
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
            Lista članarina
          </Typography>
          <List>
            {clanarine.map((clanarina) => (
              <ListItem
                key={clanarina.id}
                button
                onClick={() => handleClanarineClick(clanarina.id)}
                style={{
                  border: '1px solid #ccc',
                  marginBottom: '1rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedClanarina === clanarina.id ? '#f5f5f5' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  width: '90%',
                  margin: '0 auto',
                  borderRadius: '5px',
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ variant: 'body3' }}
                  primary={clanarina.mesec}
                  secondary={`${clanarina.cena}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {selectedClanarina && (
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="body3" align="center" gutterBottom>
              Plaćanje članarina
            </Typography>
            <form onSubmit={handlePrijavaSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
              <Grid container spacing={2} style={{ maxWidth: '300px' }}>
                <Grid item xs={12}>
                  <TextField
                    label="Ime"
                    variant="outlined"
                    fullWidth
                    value={ime}
                    onChange={handleImeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Prezime"
                    variant="outlined"
                    fullWidth
                    value={prezime}
                    onChange={handlePrezimeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Broj kartice"
                    variant="outlined"
                    fullWidth
                    value={brojKartica}
                    onChange={handleBrojKarticeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button style={{color: '#34495E'}} type="submit" variant="body3" fullWidth>
                    Plati
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
              Prijava uspešno poslana! ID je = {prijavaId}
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default PlatiClanarinu;


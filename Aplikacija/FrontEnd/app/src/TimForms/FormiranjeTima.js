import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, styled, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import { Divider } from 'antd';

const FormiranjeTima = () => {
  const [nazivTima, setTeamName] = useState('');
  const [fakultet, setCollege] = useState('');
  const [sport, setSport] = useState('');
  const [timovi, setTimovi] = useState([]);

  useEffect(() => {
    fetchTimovi();
  }, []);

  const fetchTimovi = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Trener/GetTimovi');
      setTimovi(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      nazivTima: nazivTima,
      fakultet: fakultet,
      sport: sport
    };

    try {
      const response = await axios.post('http://localhost:7240/Trener/DodajTim', teamData);
      console.log(response.data);
      // Obrada uspešno dodatog tima

      // Resetovanje polja forme nakon dodavanja
      setTeamName('');
      setCollege('');
      setSport('');

      // Osvežavanje liste timova
      fetchTimovi();
    } catch (error) {
      console.error(error);
      // Obrada greške
    }
  };

  const CustomButton = styled(Button)({
    width: 'auto',
    backgroundColor: '#3f51b5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1e2963',
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Naziv tima"
              variant="outlined"
              fullWidth
              value={nazivTima}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fakultet"
              variant="outlined"
              fullWidth
              value={fakultet}
              onChange={(e) => setCollege(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sport"
              variant="outlined"
              fullWidth
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton style={{backgroundColor: '#34495E'}} variant="contained" type="submit">
              Dodaj tim
            </CustomButton>
          </Grid>
        </Grid>
      </form>

      <Divider style={{ width: '100%', maxWidth: '400px', margin: '20px 0' }} />

      <Typography variant="body3" marginTop="10px" marginBottom="50px" style={{ textAlign: 'center' }}>
        TIMOVI
      </Typography>

      <Grid container spacing={2} style={{ maxWidth: '400px' }}>
        {timovi.map((tim) => (
          <Grid item key={tim.id} xs={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Avatar>{tim.nazivTima.charAt(0)}</Avatar>
              </Grid>
              <Grid item>
                <Typography>{tim.nazivTima}</Typography>
                <Typography>{tim.fakultet}</Typography>
              </Grid>
              
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Divider style={{ width: '100%', maxWidth: '400px', margin: '20px 0' }} />

        <Typography variant="body3" marginTop="10px" marginBottom="50px" style={{ textAlign: 'center' }}>
                UPISANI STUDENTI
        </Typography>
    </div>
  );
};

export default FormiranjeTima;













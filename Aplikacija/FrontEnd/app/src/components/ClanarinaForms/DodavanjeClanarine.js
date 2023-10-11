import React, { useState } from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { Divider, Typography } from 'antd';


const DodavanjeClanarine = () => {
  const [clanarina, setClanarina] = useState({
    Cena: '',
    Mesec: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClanarina(prevState => ({
   ...prevState,
      [name]: value
    }));
  };

  const dodajClanarinu = () => {
    axios.post('http://localhost:7240/Zaposleni/DodajClanarinu', clanarina)
      .then(response => {
        console.log('Clanarina uspešno dodata u bazu.', response.data);
      window.location.reload(); // Osvežavanje stranice nakon dodavanja
      })
      .catch(error => {
        console.error('Došlo je do greške prilikom dodavanja Clanarine:', error);
        // Dodajte odgovarajuću logiku za obradu greške
      });
  };

  return (

    <Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>

      {/* <Typography variant="body3"> Dodavanje članarine </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Cena"
            type="number"
            name="Cena"
            value={clanarina.Cena}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mesec"
            type="text"
            name="Mesec"
            value={clanarina.Mesec}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
           
              <Button variant="outlined" style={{color: '#34495E'} } size="small" onClick={dodajClanarinu}>
               
              Dodaj članarine
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

};




export default DodavanjeClanarine;
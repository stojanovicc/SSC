import React, { useState } from 'react';
import "./PlacanjeClanarine.css"
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const PlacanjeClanarine = () => {
  const [cena, setCena] = useState(0);
  const [mesec, setMesec] = useState('');

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Studentski Sportski Centar
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

  const handlePlatiClanarinu = async () => {
    try {
      // Validacija podataka
      if (cena <= 0) {
        alert('Neispravna cena članarine.');
        return;
      }

      if (mesec === '') {
        alert('Niste odabrali mesec članarine.');
        return;
      }

      // Slanje zahtjeva za plaćanje članarine na server
      const response = await fetch('https://localhost:7193/Student/PlatiClanarinu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cena, mesec }),
      });

      if (response.ok) {
        // Uspješno plaćanje
        alert('Uspešno ste platili članarinu.');
      } else {
        // Greška pri plaćanju
        alert('Došlo je do greške prilikom plaćanja članarine.');
      }
    } catch (error) {
      console.log('Greška pri slanju zahtjeva:', error);
      alert('Došlo je do greške prilikom plaćanja članarine.');
    }
  };

  return (
    <div className='forma'>
      <h1>Plaćanje članarine</h1>
      <label>
        Cena članarine:
        <input
          type="number"
          value={cena}
          onChange={(e) => setCena(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Mesec članarine:
        <select value={mesec} onChange={(e) => setMesec(e.target.value)}>
          <option value="">Odaberite mesec</option>
          <option value="Januar">Januar</option>
          <option value="Februar">Februar</option>
          <option value="Mart">Mart</option>
          <option value="April">April</option>
          <option value="Maj">Maj</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Avgust">Avgust</option>
          <option value="Septembar">Septembar</option>
          <option value="Oktobar">Oktobar</option>
          <option value="Novembar">Novembar</option>
          <option value="Decembar">Decembar</option>
        </select>
      </label>
      <button onClick={handlePlatiClanarinu}>Plati članarinu</button>
      <Copyright sx={{ mt: 5 }} />
    </div>
    
  );
};


export default PlacanjeClanarine;

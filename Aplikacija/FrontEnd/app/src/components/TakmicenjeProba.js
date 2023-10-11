import React, { useEffect, useState } from 'react';

const TakmicenjeProba = () => {
  const [takmicenja, setTakmicenja] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7193/SportskiSavez/PreuzmiNaziveTakmicenja')  // Zamijenite s pravom rutom na serveru
      .then(response => response.json())
      .then(data => setTakmicenja(data));
  }, []);

  return (
    <div>
      <h1>Takmičenja</h1>
      {takmicenja.map(takmicenje => (
        <div key={takmicenje.id}>{takmicenje.naziv}</div>
      ))}
    </div>
  );
};

export default TakmicenjeProba;

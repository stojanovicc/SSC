import React, { useState } from 'react';

const PrijavaZaTakmicenje = () => {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [fakultet, setFakultet] = useState('');
  const [nazivTakmicenja, setTakmicenje] = useState('');
  const [sport, setSport] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const prijavaData = {
      ime,
      prezime,
    };

    fetch('https://localhost:7193/Student/PrijavaNaTakmicenje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prijavaData),
    })
      .then(response => response.json())
      .then(data => {
        // Ovdje možete rukovati odgovorom servera nakon prijave
      });
  };

  return (
    <div>
      <h1>Prijava za takmičenje</h1>
      <form onSubmit={handleSubmit}>
        <div className='forma-takmicenje'> 
          <input 
          type="text"
          value={ime}
          onChange={event => setIme(event.target.value)}
          placeholder="Ime"
        />
        <input
          type="text"
          value={prezime}
          onChange={event => setPrezime(event.target.value)}
          placeholder="Prezime"
        />
        <input
          type="text"
          value={fakultet}
          onChange={event => setFakultet(event.target.value)}
          placeholder="Fakultet"
        />
        <input
          type="text"
          value={nazivTakmicenja}
          onChange={event => setTakmicenje(event.target.value)}
          placeholder="Takmicenje"
        />
        <input
          type="text"
          value={sport}
          onChange={event => setSport(event.target.value)}
          placeholder="Prezime"
        />
        
        <button type="submit">Prijavi se</button>
        </div>
      </form>
    </div>
  );
};

export default PrijavaZaTakmicenje;



// import React, { useState } from 'react';
// import "./PrijavaZaTakmicenje.css";
// import { Button } from 'react-bootstrap';
// import ComboBox from './ComboBox';

// const PrijavaZaTakmicenje= () => {
//   const [ime, setIme] = useState('');
//   const [prezime, setPrezime] = useState('');
//   const [fakultet, setFakultet] = useState('');
//   const [nazivTakmicenja, setTakmicenje] = useState('');
//   const [sport, setSport] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    

//     // Slanje POST zahteva na serversku stranu
//     try {
//       const response = await fetch('https://localhost:7193/Student/PrijavaNaTakmicenje', {//sa mog servera
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ime, prezime, fakultet,sport, nazivTakmicenja }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Uspešno ste se prijavili za takmičenje!');
//         setErrorMessage('');
//       } else {
//         const errorData = await response.json();
//         setSuccessMessage('');
//         setErrorMessage(errorData.message);
//       }
//     } catch (error) {
//       setSuccessMessage('');
//       setErrorMessage('Došlo je do greške prilikom slanja zahteva.');
//     }
//   };

//   return (
//     <div>
//       <h2 className='naslov'>Prijava za sportsko takmičenje</h2>
//         <div className='form-group'>
//         <form onSubmit={handleSubmit}> 
//             <div> 
//             <label htmlFor="ime">Ime:</label>
//             <input
//                 type="text"
//                 id="ime"
//                 value={ime}
//                 onChange={(e) => setIme(e.target.value)}
//             />
//             </div>
//             <div>
//             <label htmlFor="prezime">Prezime:</label>
//             <input
//                 type="text"
//                 id="prezime"
//                 value={ime}
//                 onChange={(e) => setPrezime(e.target.value)}
//             />
//             </div>
//             <div>
//             <label htmlFor="fakultet">Fakultet:</label>
//             <input
//                 type="text"
//                 id="fakultet"
//                 value={fakultet}
//                 onChange={(e) => setFakultet(e.target.value)}
//             />
//             </div>
//             <div>
//             <label htmlFor="sport">Sport:</label>
//             <input
//                 type="text"
//                 id="sport"
//                 value={ime}
//                 onChange={(e) => setSport(e.target.value)}
//             />
//             </div>
//             <div>
//             <label htmlFor="nazivTakmicenja">Takmičenje:</label>
//             <input
//                 type="text"
//                 id="takmicenje"
//                 value={nazivTakmicenja}
//                 onChange={(e) => setTakmicenje(e.target.value)}
//             />
//             </div>
//             </form>
//         </div>
//         <Button type="submit">Prijavi se</Button>

//     </div>

//   );
 
// }
// export default PrijavaZaTakmicenje;

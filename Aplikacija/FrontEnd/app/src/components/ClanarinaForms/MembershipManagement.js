import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState([]);
  const [newMembership, setNewMembership] = useState({
    cena: '',
    mesec: '',
  });
  const [updateMembership, setUpdateMembership] = useState({
    id: '',
    cena: '',
    mesec: '',
  });
  const [deleteMembership, setDeleteMembership] = useState('');

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Zaposleni/PreuzmiClanarine');
      setMemberships(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMembership = async () => {
    try {
      const response = await axios.post('http://localhost:7240/Zaposleni/DodajClanarinu', newMembership);
      console.log(response.data);
      fetchMemberships();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMembershipById = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7240/Zaposleni/ObrisiCalanarinu/${id}`);
      console.log(response.data);
      fetchMemberships();
    } catch (error) {
      console.error(error);
    }
  };

  const updateMembershipById = async (id, cena, mesec) => {
    try {
      const response = await axios.put(`http://localhost:7240/Zaposleni/AzurirajClanarinu/${id}/${cena}/${mesec}`);
      console.log(response.data);
      fetchMemberships();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Dodaj članarinu</h2>
      <input
        type="text"
        placeholder="Cena"
        value={newMembership.cena}
        onChange={(e) => setNewMembership({ ...newMembership, cena: e.target.value })}
      />
      <input
        type="text"
        placeholder="Mesec"
        value={newMembership.mesec}
        onChange={(e) => setNewMembership({ ...newMembership, mesec: e.target.value })}
      />
      <button onClick={addMembership}>Dodaj</button>

      <h2>Ažuriraj članarinu</h2>
      <input
        type="text"
        placeholder="ID članarine"
        value={updateMembership.id}
        onChange={(e) => setUpdateMembership({ ...updateMembership, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nova cena"
        value={updateMembership.cena}
        onChange={(e) => setUpdateMembership({ ...updateMembership, cena: e.target.value })}
      />
      <input
        type="text"
        placeholder="Novi mesec"
        value={updateMembership.mesec}
        onChange={(e) => setUpdateMembership({ ...updateMembership, mesec: e.target.value })}
      />
      <button onClick={() => updateMembershipById(updateMembership.id, updateMembership.cena, updateMembership.mesec)}>
        Ažuriraj
      </button>

      <h2>Brisanje članarine</h2>
      <input
        type="text"
        placeholder="ID članarine"
        value={deleteMembership}
        onChange={(e) => setDeleteMembership(e.target.value)}
      />
      <button onClick={() => deleteMembershipById(deleteMembership)}>Obriši</button>

      <h2>Članarine</h2>
      <ul>
        {memberships.map((membership) => (
          <li key={membership.ID}>
            ID: {membership.ID}, Cena: {membership.Cena}, Mesec: {membership.Mesec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipManagement;

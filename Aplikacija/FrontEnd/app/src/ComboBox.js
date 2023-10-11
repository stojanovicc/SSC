import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

export default function ComboBox() {
  const [sportData, setSportData] = useState(null);

  const [backgroundColor, setColor] = useState("blue");


  const getSports = async () => {
    const response = await fetch(
      "http://localhost:7240/PersonalInfo/GetSports",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setSportData(fetchData.sports
        .map((cards, index) =>
        ({
          label: cards.name
        })
        ));
    }
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    getSports();
    console.log("a");
  }, []);

  console.log(sportData);

  const navigate = useNavigate();



  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={
        sportData
      }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Sport" />}
    />
  );
}

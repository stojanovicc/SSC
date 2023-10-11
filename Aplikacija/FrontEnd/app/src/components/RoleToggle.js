import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ColorToggleButton(props) {

  const { setStudent, setEmployer, setZaposleni, selected } = props;

  const [alignment, setAlignment] = React.useState("web");
  const navigate = useNavigate();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      sx={{ mt: 2, width: 1 }}
      color='error'
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton sx={{ width: 1 }} value="student" onClick={() => { navigate("/Register/student"); setStudent() }} selected={selected === "student"}>
        <SchoolRoundedIcon />
        <Typography sx={{ ml: 1 }}> Student</Typography>
      </ToggleButton>
      <ToggleButton sx={{ width: 1 }} value="trener" onClick={() => { navigate("/Register/trener"); setEmployer() }} selected={selected === "trener"}>
        <SportsBasketballIcon />
        <Typography sx={{ ml: 1 }}> Trener</Typography>
      </ToggleButton>
      <ToggleButton sx={{ width: 1 }} value="zaposleni" onClick={() => { navigate("/Register/zaposleni"); setZaposleni() }} selected={selected === "zaposleni"}>
        <WorkRoundedIcon />
        <Typography sx={{ ml: 1 }}> Zaposleni</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

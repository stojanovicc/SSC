import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SmallInternshipCard from "./SmallInternshipCard";


export default function CardList({ type }) {
    const [takmicenjes, setTakmicenjes] = useState([]);

    const getTakmicenjes = async () => {
        let response;
        if (type === "takmicenjes") {
            response = await fetch("http://localhost:7240/SportskiSavez/GetStudentTakmicenja", {
                credentials: "include"
            });
        }
        else
            return;
        const data = await response.json();
        console.log(data)
        if (data.succeeded)
            setTakmicenjes(data.takmicenjes);
    }

    useEffect(() => {
        getTakmicenjes();
    }, [])

    return (
        <Grid container spacing={3}>
            {
                
            }
        </Grid >
    )
} 
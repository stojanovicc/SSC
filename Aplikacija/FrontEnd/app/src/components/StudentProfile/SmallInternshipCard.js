import { Button, Card, Divider, Typography, Grid, Checkbox, Avatar } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SportChips from "../TakmicenjePage/SportChips";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SmallInternshipCard({
    nazivTakmicenja = "Title",
    mestoOdrzavanja = "Mesto odrzavanja...",
    datumOdrzavanja = "Datum odrzavanja...",
    sports = [],
    link,
    maxWidth = "100%",
    takmicenjeID
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
            <Grid container>
                
                <Grid container >
                    
                    <Grid item xs={10}>
                        <Typography variant="h5" align="left">{nazivTakmicenja}</Typography>
                    </Grid>
                    <Divider sx={{ width: "100%" }} />
                    <Typography variant="subtitle1" align="left" sx={{ display: nazivTakmicenja == undefined ? "none" : "" }}>{nazivTakmicenja}</Typography>
                </Grid>

            </Grid>
            <Grid container spacing={3}  >

                <Grid item xs={12} md={12}>
                    {(mestoOdrzavanja !== undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <LocationOnIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {mestoOdrzavanja}
                    </Typography> : <></>}
                    {(datumOdrzavanja != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <QueryBuilderIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {datumOdrzavanja}
                    </Typography> : <></>}
                    <SportChips sports={sports} />

                </Grid>
            </Grid>
            <Button style={{color: '#34495E'}} sx={{ mb: -2 }} onClick={() => { if (link != undefined) navigate(link) }}>Prikaži takmičenje</Button>
        </Card>
    )
}
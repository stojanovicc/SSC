import { Button, Card, Divider, Typography, Grid, Checkbox, Avatar, SvgIcon } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SportChips from "../TakmicenjePage/SportChips";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DateRangeOutlined, PictureInPictureAltRounded, School, SportsMartialArts } from "@mui/icons-material";

export default function SmallTimCard({
    nazivTima = "Title",
    fakultet = "Datum...",
    sport = "Vreme...",
    link,
    maxWidth = "100%",
    timId
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
            <Grid container>
                
                <Grid container >
                    
                    <Grid item xs={10}>
                        <Typography variant="h5" align="left">{nazivTima}</Typography>
                    </Grid>
                    <Divider sx={{ width: "100%" }} />
                </Grid>

            </Grid>
            <Grid container spacing={3}  >

                <Grid item xs={12} md={12}>
                    {(nazivTima !== undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <PictureInPictureAltRounded style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {nazivTima}
                    </Typography> : <></>}
                    {(fakultet != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <School style={{ color:"red", marginRight: 5 }} fontSize="small" />
                        {fakultet}
                    </Typography> : <></>}
                    {(sport != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <SportsMartialArts style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {sport}
                    </Typography> : <></>}

                </Grid>
            </Grid>
            <Button style={{color:'#34495E'}} sx={{ mb: -2 }} onClick={() => { if (link != undefined) navigate(link) }}>Prikaži tim</Button>
        </Card>
    )
}
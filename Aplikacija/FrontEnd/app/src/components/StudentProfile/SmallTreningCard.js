import { Button, Card, Divider, Typography, Grid, Checkbox, Avatar } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SportChips from "../TakmicenjePage/SportChips";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DateRangeOutlined } from "@mui/icons-material";

export default function SmallTreningCard({
    mesto = "Title",
    datum = "Datum...",
    vreme = "Vreme...",
   // sports = [],
    // location,
    link,
    // time,
    // banner,
    maxWidth = "100%",
    // wishlisted = false,
    treningId
    // picture
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
            <Grid container>
                
                <Grid container >
                    
                    <Grid item xs={10}>
                        <Typography variant="h5" align="left">{mesto}</Typography>
                    </Grid>
                    {/* <Grid item xs={2} sx={{ display: (showBookmark ? "flex" : "none"), flexDirection: "row-reverse" }}>
                        <Checkbox
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            // checked={inWishlist}
                            // onChange={handleWishlist}
                        />
                    </Grid> */}
                    <Divider sx={{ width: "100%" }} />
                    {/* <Typography variant="subtitle1" align="left" sx={{ display: mesto == undefined ? "none" : "" }}>{mesto}</Typography> */}
                </Grid>

            </Grid>
            <Grid container spacing={3}  >

                <Grid item xs={12} md={12}>
                    {(mesto !== undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <LocationOnIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {mesto}
                    </Typography> : <></>}
                    {(datum != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <DateRangeOutlined style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {datum}
                    </Typography> : <></>}
                    {(vreme != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <QueryBuilderIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {vreme}
                    </Typography> : <></>}
                    {/* <SportChips sports={sports} /> */}

                </Grid>
            </Grid>
            <Button style={{color:'#34495E'}} sx={{ mb: -2 }} onClick={() => { if (link != undefined) navigate(link) }}>Prikaži trening</Button>
            {/* {(datumSatnica != undefined) ? datumSatnica : <></>} */}
        </Card>
    )
}
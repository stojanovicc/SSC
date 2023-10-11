import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';

export default function EditTakmicenje({ currentNaziv, currentMesto, currentVreme, takmicenjeId, update }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let fetchReq = `http://localhost:7240/SportskiSavez/EditTakmicenje/${takmicenjeId}/${naziv}/${mesto}/${datum}`
        fetchReq = encodeURI(fetchReq);
        fetch(fetchReq, {
            method: "PUT",
            credentials: "include"
        }).then(response => {
            response.json().then(data => {
                if (data.succeeded) {
                    update();
                }
                else {
                    alert("Promene su neuspesne");
                }
                handleClose();
            })
        })
    }

    const [naziv, setNaziv] = useState(currentNaziv);
    const [mesto, setMesto] = useState(currentMesto);
    const [datum, setVreme] = useState(currentVreme);

    React.useEffect(() => {
        setNaziv(currentNaziv);
        setMesto(currentMesto);
        setVreme(currentVreme);
    }, [currentNaziv, currentMesto, currentVreme])

    return (
        <div>

            <Button
                color='error'
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Izmeni Takmicenje
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit profile info"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Naziv takmicenja"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setNaziv(e.target.value) }}
                        value={naziv}
                        required
                        error={naziv === "" || naziv === undefined}

                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mesto odrzavanja"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setMesto(parseInt(e.target.value)) }}
                        value={mesto}
                        required
                        error={mesto === undefined}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Datum odrzavanja"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setMesto(parseInt(e.target.value)) }}
                        value={datum}
                        required
                        error={datum === undefined}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{color:'#34495E'}}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        style={{color:'#34495E'}}
                        variant='outlined'
                        autoFocus
                        disabled={!(naziv !== "" && mesto !== ""&& datum !== "" )}
                    >
                        Sacuvaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, TextField, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";

export default function EditStudentProfileDialog({
    currentName,
    currentLastName,
    currentPicture,
    update,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSelectImage = () => {
        setFilename(fileInput.current.files[0].name);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        fetch(
            "http://localhost:7240/Account/EditStudent?firstName=" +
            name +
            "&lastName=" +
            lastName +
            "&picture=" +
            filename,
            {
                method: "PUT",
                credentials: "include",
            }
        ).then((response) => {
            response.json().then((data) => {
                if (data.succeeded) {
                    localStorage.setItem("picture", filename);
                    update();
                } else {
                    alert("Changes were not successful");
                }
                handleClose();
            });
        });
    };

    const [name, setName] = useState(currentName);
    const [lastName, setLastName] = useState(currentLastName);
    const fileInput = React.createRef();

    const [filename, setFilename] = useState(currentPicture);
    
    React.useEffect(() => {
        setName(currentName);
        setLastName(currentLastName);
        setFilename(currentPicture);
    }, [currentLastName, currentName, currentPicture]);

    return (
        <div>
            <Button
                color='error'
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Izmeni profil
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit profile info"}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ime"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        required
                        error={name === undefined || name === ""}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Prezime"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        value={lastName}
                        required
                        error={lastName === undefined || lastName === ""}
                    />
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                        <Button style={{backgroundColor: '#34495E'}} variant="contained" component="label">
                            Izaberi Sliku
                            <input
                                type="file"
                                hidden
                                ref={fileInput}
                                onChange={handleSelectImage}
                            />
                        </Button>
                        <Avatar
                            src={process.env.PUBLIC_URL + "/resources/" + filename}
                        ></Avatar>
                        <Typography>{filename}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button style={{color:'#34495E'}} onClick={handleClose}>Cancel</Button>
                    <Button
                        style={{color:'#34495E'}}
                        onClick={handleSubmit}
                        autoFocus
                        disabled={!(name !== "" && filename !== "" && lastName !== "")}
                    >
                        Sacuvaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
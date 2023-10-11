import { Box, Autocomplete, Grid, Divider } from "@mui/material";
import TextInputField from "../FormFields/TextInputField";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Card(props) {
    const { name, onDelete } = props;
    return (
        <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 5, mb: 3 }} >
                <Tooltip title="Delete" placement="top" arrow>
                    <IconButton aria-label="delete" color="error" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            </Divider>

            <Grid container spacing={3}>
                        <>

                            <Grid item xs={12}>
                                <TextInputField name={name + ".nazivFakulteta"} label={"Naziv*"} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".grad"} label={"Grad*"} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".univerzitet"} label={"Univerzitet*"} fullWidth />
                            </Grid>
                        </>
            </Grid>
        </Box >
    );
}
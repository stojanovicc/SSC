import { Chip } from "@mui/material";
import { Box } from "@mui/system";

export default function SportChips({ sports, variant = "filled" }) {
    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {
                sports.map((sport, index) => (
                    <Chip key={index} label={sport.naziv} variant={variant} />
                ))
            }
        </Box>
    )
}
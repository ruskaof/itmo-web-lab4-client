import React from "react";
import {Box, TextField} from "@mui/material";

export default function Fields() {
    const [fieldsData, setFieldsData] = React.useState({
        x: "",
        y: "",
        r: "",
    });

    function handleChange(event) {
        const {name, value} = event.target;
        if (!isNaN(value) || value === "") {
            setFieldsData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    return (
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', width: '400px', gap: '10px', marginBottom: '10px',
            }}
        >
            <TextField id="x" name="x" label="X" variant="outlined" value={fieldsData.x} onChange={handleChange}/>
            <TextField id="y" name="y" label="Y" variant="outlined" value={fieldsData.y} onChange={handleChange}/>
            <TextField id="r" name="r" label="R" variant="outlined" value={fieldsData.r} onChange={handleChange}/>
        </Box>
    )
}
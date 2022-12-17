import React from "react";
import {Box, TextField} from "@mui/material";
import {setR, setX, setY} from "../../../redux/attempts/actions.js";
import {connect} from "react-redux";

export function Fields({currentEnteredX, currentEnteredY, currentEnteredR, setX, setY, setR}) {
    function handleChange(event) {
        const {name, value} = event.target;
        if (!isNaN(value) || value === "" || value === "-") {
            switch (name) {
                case "x":
                    setX(value);
                    break;
                case "y":
                    setY(value);
                    break;
                case "r":
                    setR(value);
                    break;
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', width: '350px', gap: '10px', marginBottom: '10px',
            }}
        >
            <TextField id="x" name="x" label="X" variant="outlined" value={currentEnteredX} onChange={handleChange}/>
            <TextField id="y" name="y" label="Y" variant="outlined" value={currentEnteredY} onChange={handleChange}/>
            <TextField id="r" name="r" label="R" variant="outlined" value={currentEnteredR} onChange={handleChange}/>
        </Box>
    )
}

function mapStateToFormProps(state) {
    return {
        currentEnteredX: state.currentEnteredX,
        currentEnteredY: state.currentEnteredY,
        currentEnteredR: state.currentEnteredR,
    }
}

function mapDispatchToFromProps(dispatch) {
    return {
        setX: (x) => {
            dispatch(setX(x))
        },
        setY(y) {
            dispatch(setY(y))
        },
        setR(r) {
            dispatch(setR(r))
        }
    }
}

export default connect(mapStateToFormProps, mapDispatchToFromProps)(Fields)
import React from "react";
import {Box, Button} from "@mui/material";
import {connect} from "react-redux";
import {fetchAddAttempt, fetchDeleteAllAttempts, setFormError} from "../../../redux/attempts/actions.js";

export function Buttons({
                            currentEnteredX,
                            currentEnteredY,
                            currentEnteredR,
                            fetchAddAttempt,
                            fetchDeleteAllAttempts,
                            setFormError,
                            nextTablePageIsLoading
                        }) {
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '350px',
        justifyContent: 'center',
        gap: '10px',
        paddingBottom: '10px'
    }}>
        <Button variant="outlined" onClick={() => {
            addAttemptIfValid(fetchAddAttempt, currentEnteredX, currentEnteredY, currentEnteredR, setFormError)
        }}
                disabled={nextTablePageIsLoading}>
            Submit
        </Button>
        <Button variant="outlined" onClick={fetchDeleteAllAttempts}
                disabled={nextTablePageIsLoading}>Reset</Button>
    </Box>)
}

function addAttemptIfValid(addAttemptFunction, x, y, r, errorSetter) {
    if (!isNaN(x) && (x >= -3 && x <= 3) && !isNaN(y) && (y >= -5 && y <= 5) && !isNaN(r) && (r > 0 && r <= 3)) {
        addAttemptFunction({x: x, y: y, r: r});
        errorSetter("");
    } else {
        errorSetter("Invalid input: x must be a number in [-3; 3], y must be a number in [-5; 5], r must be a number in (0; 3]");
    }
}


function mapButtonStateToFormProps(state) {
    return {
        currentEnteredX: state.currentEnteredX,
        currentEnteredY: state.currentEnteredY,
        currentEnteredR: state.currentEnteredR,
        nextTablePageIsLoading: state.tableNextPageIsLoading
    }
}

function mapDispatchToButtonsProps(dispatch) {
    return {
        fetchAddAttempt: (attempt) => dispatch(fetchAddAttempt(attempt)),
        fetchDeleteAllAttempts: () => dispatch(fetchDeleteAllAttempts()),
        setFormError: (error) => dispatch(setFormError(error))
    }
}

export default connect(mapButtonStateToFormProps, mapDispatchToButtonsProps)(Buttons);
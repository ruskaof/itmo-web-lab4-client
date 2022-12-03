import React from "react";
import {Box, Button} from "@mui/material";
import {ApplicationService} from "../../services/ApplicationService.js";
import {connect} from "react-redux";
import {fetchAddAttempt, fetchDeleteAllAttempts} from "../../redux/attempts/actions.js";

export function Buttons(props) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '400px',
            justifyContent: 'center',
            gap: '10px',
            paddingBottom: '10px'
        }}>
            <Button variant="outlined" onClick={() => {
                addAttemptFromCurrentData(props.fetchAddAttempt)
            }}>
                Submit
            </Button>
            <Button variant="outlined" onClick={props.fetchDeleteAllAttempts}>Reset</Button>
            <Button variant="outlined" onClick={ApplicationService.getAllAttempts}>Get to console</Button>
        </Box>
    )
}

function addAttemptFromCurrentData(addAction) {
    return addAction({
        x: 10,
        y: 11,
        r: 1,
    })
}

function mapDispatchToButtonsProps(dispatch) {
    return {
        fetchAddAttempt: (attempt) => dispatch(fetchAddAttempt(attempt)),
        fetchDeleteAllAttempts: () => dispatch(fetchDeleteAllAttempts())
    }
}

export default connect(null, mapDispatchToButtonsProps)(Buttons);
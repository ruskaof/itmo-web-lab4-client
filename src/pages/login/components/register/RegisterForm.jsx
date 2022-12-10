import React from "react";
import LoginFormFields from "./RegisterFormFields.jsx";
import LoginFormButtons from "./RegisterFormButtons.jsx";
import {connect} from "react-redux";
import {Alert} from "@mui/material";

function RegisterForm({errorMessage}) {
    return (
        <div>
            <LoginFormFields/>
            <LoginFormButtons/>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </div>
    )
}

function mapStateToRegisterFormFieldsProps(state) {
    return {
        errorMessage: state.registerFormErrorMessage,
    }
}

export default connect(mapStateToRegisterFormFieldsProps)(RegisterForm)
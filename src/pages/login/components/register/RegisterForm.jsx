import React from "react";
import LoginFormFields from "./RegisterFormFields.jsx";
import LoginFormButtons from "./RegisterFormButtons.jsx";
import {connect} from "react-redux";
import {Alert} from "@mui/material";

function RegisterForm({errorMessage, successMessage}) {
    return (
        <div>
            <LoginFormFields/>
            <LoginFormButtons/>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </div>
    )
}

function mapStateToRegisterFormFieldsProps(state) {
    return {
        errorMessage: state.registerFormErrorMessage,
        successMessage: state.registerFormSuccessMessage
    }
}

export default connect(mapStateToRegisterFormFieldsProps)(RegisterForm)
import React from "react";
import LoginFormFields from "./LoginFormFields.jsx";
import LoginFormButtons from "./LoginFormButtons.jsx";
import {connect} from "react-redux";
import {Alert} from "@mui/material";
import {Navigate} from "react-router-dom";

function LoginForm({errorMessage, loggedIn}) {
    console.log("ERR: " + errorMessage);
    return (
        <div>
            <LoginFormFields/>
            <LoginFormButtons/>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {loggedIn &&  <Navigate to="/"/>}
        </div>
    )
}

function mapStateToLoginFormFieldsProps(state) {
    return {
        errorMessage: state.loginFormErrorMessage,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToLoginFormFieldsProps)(LoginForm)
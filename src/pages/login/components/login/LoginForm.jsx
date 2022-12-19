import React from "react";
import LoginFormFields from "./LoginFormFields.jsx";
import LoginFormButtons from "./LoginFormButtons.jsx";
import {connect} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {Navigate} from "react-router-dom";
import {setLoginFormError} from "../../../../redux/attempts/actions.js";

function LoginForm({errorMessage, loggedIn, setErrorMessage}) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <LoginFormFields/>
            <LoginFormButtons/>
            <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => {
                setErrorMessage('')
            }}>
                <Alert onClose={() => setErrorMessage("")} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
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

function mapDispatchToLoginFormFieldsProps(dispatch) {
    return {
        setErrorMessage: (errorMessage) => {
            dispatch(setLoginFormError(errorMessage))
        }
    }
}

export default connect(mapStateToLoginFormFieldsProps, mapDispatchToLoginFormFieldsProps)(LoginForm)
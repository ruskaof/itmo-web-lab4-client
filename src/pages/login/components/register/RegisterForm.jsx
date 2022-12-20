import React from "react";
import RegisterFormFields from "./RegisterFormFields.jsx";
import RegisterFormButtons from "./RegisterFormButtons.jsx";
import {connect} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {setRegisterFormError, setRegisterFormSuccessMessage} from "../../../../redux/attempts/actions.js";

function RegisterForm({errorMessage, successMessage, setErrorMessage, setSuccessMessage}) {
    return (<div style={{
        width: '100%', height: '100%',
    }}>
        <RegisterFormFields/>
        <RegisterFormButtons/>
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage("")}>
            <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{width: '100%'}}>
                {successMessage}
            </Alert>
        </Snackbar>
        <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => {
            setErrorMessage('')
        }}>
            <Alert onClose={() => setErrorMessage("")} severity="error" sx={{width: '100%'}}>
                {errorMessage}
            </Alert>
        </Snackbar>
    </div>)
}

function mapStateToRegisterFormFieldsProps(state) {
    return {
        errorMessage: state.registerFormErrorMessage, successMessage: state.registerFormSuccessMessage
    }
}

function mapDispatchToRegisterFormFieldsProps(dispatch) {
    return {
        setErrorMessage: (errorMessage) => {
            dispatch(setRegisterFormError(errorMessage))
        }, setSuccessMessage: (successMessage) => {
            dispatch(setRegisterFormSuccessMessage(successMessage))
        }
    }
}

export default connect(mapStateToRegisterFormFieldsProps, mapDispatchToRegisterFormFieldsProps)(RegisterForm)
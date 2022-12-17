import React from "react";
import {Button} from "@mui/material";
import {fetchLogin, fetchRegister} from "../../../../redux/attempts/actions.js";
import {connect} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

/**
 * Should only be used in {@link RegisterForm}
 * @param username
 * @param password
 * @param login
 * @param loading
 * @returns {JSX.Element}
 * @constructor
 */
function RegisterFormButtons({username, password, register, loading}) {
    return (<div style={{display: "flex", flexDirection: "row"}}>
        <LoadingButton variant="outlined" loading={loading}
                       onClick={() => register(username, password)}>Register</LoadingButton>
    </div>)
}

function mapStateToLoginFormButtonsProps(state) {
    return {
        username: state.registerFormUsername,
        password: state.registerFormPassword,
        passwordRepeat: state.registerFormPasswordRepeat,
        loading: state.authFormIsLoading
    }
}

function mapDispatchToLoginFormButtonsProps(dispatch) {
    return {
        register: (username, password) => {
            dispatch(fetchRegister(username, password))
        },
    }
}

export default connect(mapStateToLoginFormButtonsProps, mapDispatchToLoginFormButtonsProps)(RegisterFormButtons)


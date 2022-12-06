import React from "react";
import {Button} from "@mui/material";
import {fetchLogin} from "../../../redux/attempts/actions.js";
import {connect} from "react-redux";

function LoginFormButtons({username, password, login}) {
    return (<div>
        <Button variant="outlined" onClick={() => login(username, password)}>Login</Button>
    </div>)
}

function mapStateToLoginFormButtonsProps(state) {
    return {
        username: state.loginFormUsername, password: state.loginFormPassword
    }
}

function mapDispatchToLoginFormButtonsProps(dispatch) {
    return {
        login: (username, password) => {
            dispatch(fetchLogin(username, password))
        }
    }
}

export default connect(mapStateToLoginFormButtonsProps, mapDispatchToLoginFormButtonsProps)(LoginFormButtons)


import React from "react";
import {fetchLogin} from "../../../../redux/attempts/actions.js";
import LoadingButton from '@mui/lab/LoadingButton';
import {connect} from "react-redux";

/**
 * Should only be used in {@link LoginForm}
 * @param username
 * @param password
 * @param login
 * @param loading
 * @returns {JSX.Element}
 * @constructor
 */
function LoginFormButtons({username, password, login, loading}) {
    return (<div>
        <LoadingButton loading={loading} variant="outlined" onClick={() => login(username, password)}>Login</LoadingButton>
    </div>)
}

function mapStateToLoginFormButtonsProps(state) {
    return {
        username: state.loginFormUsername, password: state.loginFormPassword, loading: state.authFormIsLoading
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


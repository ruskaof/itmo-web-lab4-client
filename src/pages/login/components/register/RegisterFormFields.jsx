import React from "react";
import {Alert, Box, TextField} from "@mui/material";
import {
    setRegisterFormPassword,
    setRegisterFormPasswordRepeat,
    setRegisterFormUsername
} from "../../../../redux/attempts/actions.js";
import {connect} from "react-redux";
import {useIsMobile} from "../../../../utility/useIsMobile.js";

/**
 * Should only be used in {@link RegisterForm}
 * @param username
 * @param password
 * @param setUsername
 * @param setPassword
 * @returns {JSX.Element}
 * @constructor
 */
function RegisterFormFields({username, password, setUsername, setPassword, errorMessage, passwordRepeat, setPasswordRepeat}) {
    const isMobile = useIsMobile();
    function handleChange(event) {
        const {name, value} = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        gap: '10px',
        marginBottom: '10px',
    }}>
        <TextField variant="outlined" name="username" value={username} label="Username" onChange={handleChange}/>
        <TextField variant="outlined" name="password" value={password} label="Password" type="password"
                   onChange={handleChange}/>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Box>)
}

function mapStateToRegisterFormProps(state) {
    return {
        username: state.registerFormUsername,
        password: state.registerFormPassword,
        passwordRepeat: state.registerFormPasswordRepeat,
    }
}

function mapDispatchToRegisterFormProps(dispatch) {
    return {
        setUsername: (username) => {
            dispatch(setRegisterFormUsername(username))
        }, setPassword: (password) => {
            dispatch(setRegisterFormPassword(password))
        }, setPasswordRepeat: (passwordRepeat) => {
            dispatch(setRegisterFormPasswordRepeat(passwordRepeat))
        }
    }
}

export default connect(mapStateToRegisterFormProps, mapDispatchToRegisterFormProps)(RegisterFormFields)
import React from "react";
import {Box, TextField} from "@mui/material";
import {setLoginFormPassword, setLoginFormUsername} from "../../../../redux/attempts/actions.js";
import {connect} from "react-redux";

/**
 * Should only be used in {@link LoginForm}
 * @param username
 * @param password
 * @param setUsername
 * @param setPassword
 * @returns {JSX.Element}
 * @constructor
 */
function LoginFormFields({username, password, setUsername, setPassword}) {
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
        </Box>)
}

function mapStateToLoginFormProps(state) {
    return {
        username: state.loginFormUsername, password: state.loginFormPassword
    }
}

function mapDispatchToLoginFormProps(dispatch) {
    return {
        setUsername: (username) => {
            dispatch(setLoginFormUsername(username))
        }, setPassword: (password) => {
            dispatch(setLoginFormPassword(password))
        }
    }
}

export default connect(mapStateToLoginFormProps, mapDispatchToLoginFormProps)(LoginFormFields)
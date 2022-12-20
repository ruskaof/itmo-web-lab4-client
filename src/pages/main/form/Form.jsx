import React from "react";
import Buttons from "./Buttons.jsx";
import Fields from "./Fields.jsx";
import {setFormError} from "../../../redux/attempts/actions.js";
import {connect} from "react-redux";
import {Alert, Snackbar} from "@mui/material";

function Form({formError, setFormError}) {
    return (<div>
            <Fields/>
            <Buttons/>
            <Snackbar open={!!formError} autoHideDuration={6000} onClose={(data) => {
                // ignore graph click events
                if (data && data.type === "click") {
                    return;
                }
                setFormError("");
            }}>
                <Alert onClose={() => setFormError("")} severity="error" sx={{width: '100%'}}>
                    {formError}
                </Alert>
            </Snackbar>
        </div>)
}

function mapStateToFormProps(state) {
    return {
        formError: state.formErrorMessage,
    }
}

function mapDispatchToFormProps(dispatch) {
    return {
        setFormError: (formError) => {
            dispatch(setFormError(formError))
        }
    }
}

export default connect(mapStateToFormProps, mapDispatchToFormProps)(Form)
// noinspection ES6CheckImport

import React from 'react';
import {Box} from "@mui/material";
import Graph from "./Graph.jsx";
import Form from "./form/Form.jsx";
import Table from "./table/Table.jsx";
import {connect} from "react-redux";
import { Navigate } from 'react-router-dom';


function MainPage({loggedIn}) {
    if (!loggedIn) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            <Box sx={{marginLeft: '20px'}}>
                <Graph/>
                <Form/>
                <Table/>
            </Box>
        </div>
    );
}

function mapStateToMainPageProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToMainPageProps)(MainPage)

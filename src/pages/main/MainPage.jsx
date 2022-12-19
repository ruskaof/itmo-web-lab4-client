// noinspection ES6CheckImport

import React from 'react';
import {Box, useMediaQuery} from "@mui/material";
import Graph from "./graph/Graph.jsx";
import Form from "./form/Form.jsx";
import Table from "./table/Table.jsx";
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom';
import {useIsMobile} from "../../utility/useIsMobile.js";


function MainPage({loggedIn}) {
    if (!loggedIn) {
        return <Navigate to="/login"/>
    }
    return (<div>
        <Box sx={{marginLeft: '20px'}}>
            <div style={useIsMobile() ? {} : {
                display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center', alignItems: 'center'
            }}>
                <Box sx={useIsMobile() ? {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                } : {}}>
                    <Graph/>
                    <Form/>
                </Box>
                <Table/>
            </div>
        </Box>


    </div>);
}

function mapStateToMainPageProps(state) {
    return {
        loggedIn: state.loggedIn,
    }
}

export default connect(mapStateToMainPageProps)(MainPage)

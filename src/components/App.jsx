import React from 'react';
import Header from "./Header.jsx";
import Graph from "./Graph.jsx";
import Form from "./form/Form.jsx";
import {Box} from "@mui/material";
import MyTable from "./MyTable.jsx";
import {Provider} from "react-redux";
import {store} from "../redux/attempts/store.js";
import BigDataTable from "./BigDataTable.jsx";


const App = () => {


    return (
        <Provider store={store}>
            <div>
                <Header/>
                <Box sx={{marginLeft: '20px'}}>
                    <Graph/>
                    <Form/>
                    <BigDataTable/>
                </Box>
            </div>
        </Provider>
    );
};

export default App;
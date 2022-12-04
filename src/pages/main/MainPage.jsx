import React from 'react';
import {Box} from "@mui/material";
import Graph from "./Graph.jsx";
import Form from "./form/Form.jsx";
import VirtualizedGrid from "./VirtualizedGrid.jsx";

export default function MainPage() {
    return (
        <div>
            <Box sx={{marginLeft: '20px'}}>
                <Graph/>
                <Form/>
                <VirtualizedGrid/>
            </Box>
        </div>
    );
}

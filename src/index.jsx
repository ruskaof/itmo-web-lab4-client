import './style/main.scss';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import React from 'react';
import App from "./App.jsx";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6/index.js";
import {QueryParamProvider} from "use-query-params";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <ThemeProvider theme={darkTheme}>
                <App/>
            </ThemeProvider>
        </QueryParamProvider>
    </BrowserRouter>
</React.StrictMode>);
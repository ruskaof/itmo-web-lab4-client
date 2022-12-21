import './style/main.scss';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import React from 'react';
import App from "./App.jsx";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
</React.StrictMode>);
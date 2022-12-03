import './style/main.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import App from "./components/App.jsx";
import ReactDOM from 'react-dom/client';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
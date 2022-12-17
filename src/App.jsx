import React from 'react';
import {Provider} from "react-redux";
import {store} from "./redux/attempts/store.js";
import MainPage from "./pages/main/MainPage.jsx";
import {Routes, Route, Link} from 'react-router-dom';
import Header from "./components/header/Header.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";


const App = () => {


    return (
        <Provider store={store}>
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<div>404</div>}/>
            </Routes>
        </Provider>
    );
};

export default App;
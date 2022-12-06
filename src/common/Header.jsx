import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div>
                <h1 className="header__text">Dmitrii Rusinov</h1>
                <h2 className="header__text2">P32302, var 9876451</h2>
            </div>
            <div className="header__refs-cont">
                <Link to="/" className="header__ref">Main</Link>
                <Link to="/login" className="header__ref">Login</Link>
            </div>

        </header>
    );
}
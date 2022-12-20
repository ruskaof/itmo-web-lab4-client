import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {JwtManager} from "../../service/JwtManager.js";
import {connect} from "react-redux";
import {useIsMobile} from "../../utility/useIsMobile.js";

function Header({isLoggedIn}) {
    const usingMobile = useIsMobile()
    const additionalStyle = {
        fontSize: usingMobile ? '1.3rem' : '2rem',
    }

    return (<header className="header">
        <div>
            <h1 className="header__text" style={additionalStyle}>Dmitrii Rusinov</h1>
            <h2 className="header__text2" style={additionalStyle}>P32302, var 9876451</h2>
        </div>
        {isLoggedIn && <Button variant="contained" onClick={() => {
            JwtManager.logout()
        }} sx={{width: '100px'}}>Log out</Button>}


    </header>);
}

function mapStateToHeaderProps(state) {
    return {
        isLoggedIn: state.loggedIn,
    }
}

export default connect(mapStateToHeaderProps)(Header);
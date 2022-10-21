import React, { useState } from 'react';
import Header from "../../containers/Header/Header";
import Login from "../../containers/Login/Login";
import Register from '../../containers/Register/Register';

const Start: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(false)
    }

    const handleRegister = () => {
        setIsLoggedIn(true)
    }
    return (
        <>
            <Header img={'../Images/headerback.jpg'} title={'Welcome to CardShop'} />
            <div className='container'>
                {isLoggedIn ? <Login handleLogin={handleLogin}/> : <Register handleRegister={handleRegister} />}
            </div>
        </>
    );
};

export default Start;
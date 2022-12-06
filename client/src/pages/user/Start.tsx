import React, {useEffect, useState} from 'react';
import Header from "../../containers/Header/Header";
import Login from "../../containers/Login/Login";
import Register from '../../containers/Register/Register';
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {getAllCars} from "../../redux/reducers/Car/carSlice";
import {toast} from "react-toastify";

const Start: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { status } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCars())
        toast(status)
    }, [])

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
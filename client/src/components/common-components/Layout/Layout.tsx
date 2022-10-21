import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../../containers/Footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC = () => {
    return (
        <>
            <Outlet />
            <ToastContainer position='bottom-right'/>
            <Footer />
        </>
    )
};

export default Layout;
import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { useAppSelectors } from "../hooks/redux";
import {TRolesUser} from "../constants/rolesUser";

interface IRequireAuth {
    children: JSX.Element,
}

const RequireAuth = ({ children }: IRequireAuth) => {
    const location = useLocation()
    const { token, currentUser } = useAppSelectors(state => state.userReducer)
    const isAuth = Boolean(token)

    if(!isAuth) {
        return <Navigate to={'/'} state={{from: location}} />
    }

    return children
};

export default RequireAuth;
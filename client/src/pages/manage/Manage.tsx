import React, {useEffect} from 'react';
import CreateCar from './CreateCar';
import Header from '../../containers/Header/Header';
import ManageMenu from '../../containers/ManageMenu/ManageMenu';
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {getAllOrders} from "../../redux/reducers/Order/orderSlice";

const Manage: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Manage page' />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px] mb-[20px]'>
                <ManageMenu />
            </div>
        </div>
    );
};

export default Manage;
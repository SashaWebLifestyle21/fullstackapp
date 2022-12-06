import React, {useEffect, useState} from 'react';
import {getAllCars, ICar} from "../../redux/reducers/Car/carSlice";
import { IUser } from "../../redux/reducers/user/userSlice";
import {APPROVED, PROCESSED, REFUSED, TStatusOrder} from "../../constants/statusOrder";
import Status from "./Status/Status";
import axios from "../../api/axios/axios";
import Button from "./Button/Button";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {getAllOrders, updateOrder} from "../../redux/reducers/Order/orderSlice";


export interface IOrder {
    car: ICar
    user: IUser
    status: TStatusOrder
    _id: string
}

interface IOrderProp {
    order: IOrder,
    handleApproved: (order: IOrder, manageId: string) => void
    handleRefused: (order: IOrder, manageId: string) => void
    manageId: string
}

const Order = ({ order, handleApproved, handleRefused, manageId }: IOrderProp) => {

    return (
        <div className='shadow-md max-w-[280px] w-[100%] p-[30px] bg-white rounded-[20px]'>
            <Status status={order.status} />
            {order.car.imgUrl && (
                <img
                    src={`http://localhost:5000/Image/Cars/${order.car.imgUrl}`}
                    alt={order.car.model}
                    className='object-cover w-full mb-[20px]'
                />
            )}
            <p className='text-primary text-lg font-semiBold'>{order.car.brand} {order.car.model}</p>
            <p className='text-primary text-lg font-semiBold'>Цвет: {order.car.color}</p>
            <p className='text-primary text-lg font-semiBold'>Заказчик: {order.user.username}</p>
            <p className='text-primary text-lg font-semiBold'>email: {order.user.email}</p>
            <p className='text-primary text-lg font-semiBold'>Авто в наличии: {order.car.count}</p>
            {order.car.count === 0 && order.status === PROCESSED &&
                <Button
                    className='bg-primary text-white w-[100%] hover:bg-secondary'
                    onClick={() => handleRefused(order, manageId)}
                >
                    Отказать
                </Button>}
            {order.status === PROCESSED && order.car.count !== 0 &&
                <Button
                    className='bg-primary text-white w-[100%] hover:bg-secondary'
                    onClick={() => handleApproved(order, manageId)}
                >
                    Подтвердить
                </Button>}

        </div>
    );
};

export default Order;
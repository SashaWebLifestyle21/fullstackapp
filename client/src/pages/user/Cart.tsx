import React, {useEffect, useState} from 'react';
import Header from "../../containers/Header/Header";
import axios from "../../api/axios/axios";
import {useAppSelectors} from "../../hooks/redux";
import MyOrder, {IMyOrder} from "../../components/common-components/MyOrder/MyOrder";
import {Link} from "react-router-dom";

const Cart = () => {

    const { currentUser } = useAppSelectors(state => state.userReducer)

    const [myOrders, setMyOrders] = useState<IMyOrder[]>([])

    const fetchOrders = async (id: string) => {
        await axios.get(`/order/getOrdersByUser/${id}`)
            .then((result) => {
                setMyOrders(result.data.order)
            })
    }

    useEffect(() => {
        fetchOrders(currentUser.id)
    }, [])

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title={'Мои покупки'} />
            <div className='max-w-[1200px] m-auto mb-[20px]'>
                <Link className='border-2 border-primary p-[10px] rounded-[15px]' to={'/home'}>Назад</Link>
            </div>
            <div className='max-w-[1200px] m-auto mb-[20px] flex items-center justify-center gap-x-[20px]'>
                {myOrders && myOrders.map(order => {
                    return <MyOrder car={order.car} manager={order.manager} status={order.status} user={order.user} guarantee={order.guarantee}/>
                })}
            </div>
        </div>
    );
};

export default Cart;
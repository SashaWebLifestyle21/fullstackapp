import React, {useCallback, useEffect, useState} from 'react';
import Header from "../../containers/Header/Header";
import Order, {IOrder} from "../../components/common-components/Order";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import Button from "../../components/common-components/Button/Button";
import {PROCESSED, APPROVED, REFUSED} from "../../constants/statusOrder";
import {getAllOrders, updateOrder} from "../../redux/reducers/Order/orderSlice";

const Orders: React.FC = () => {

    const { orders } = useAppSelectors(state => state.orderReducer)
    const { currentUser } = useAppSelectors(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [listOrder, setListOrder] = useState(orders)

    useEffect(() => {
        dispatch(getAllOrders())
        setListOrder(orders)
    },[dispatch])

    const handleApproved = useCallback(async (order: IOrder, manageId: string) => {
        dispatch(updateOrder({id: order.car._id, status: APPROVED, orderId: order._id, managerId: manageId }))
    },[dispatch])
    const handleRefused = useCallback(async (order: IOrder, manageId: string) => {
        dispatch(updateOrder({status: REFUSED, orderId: order._id, managerId: manageId}))
    },[dispatch])

    const filterOrder = (status: string) => {
        setListOrder([...orders].filter(order => order.status === status))
    }

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Заказы' />
            <div className='max-w-[1200px] m-auto flex items-center justify-center'>
                <div className='flex items-center justify-center gap-x-[20px]'>
                    <Button
                        className='w-[200px] border-grey border-2 hover:bg-primary hover:text-white focus:bg-primary focus:text-white'
                        onClick={() => filterOrder(PROCESSED)}
                    >
                        В Ожидании
                    </Button>
                    <Button
                        className='w-[200px] border-grey border-2 hover:bg-primary hover:text-white focus:bg-primary focus:text-white'
                        onClick={() => filterOrder(APPROVED)}
                    >
                        Одобрено
                    </Button>
                    <Button
                        className='w-[200px] border-grey border-2 hover:bg-primary hover:text-white focus:bg-primary focus:text-white'
                        onClick={() => filterOrder(REFUSED)}
                    >
                        Отказано
                    </Button>
                </div>
            </div>
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px] mb-[20px]'>
                {listOrder.map(order => {
                    return <Order key={order._id} order={order} handleApproved={handleApproved} handleRefused={handleRefused} manageId={currentUser.id} />
                })}
            </div>
        </div>
    );
};

export default Orders;
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {getAllCars} from "../../redux/reducers/Car/carSlice";
import {toast} from "react-toastify";
import Loader from "../../components/common-components/Loader/Loader";
import Title from "../../components/common-components/Title/Title";
import {Link} from "react-router-dom";
import Card from "../../components/common-components/Card/Card";
import Header from "../../containers/Header/Header";

const ListCar: React.FC = () => {
    const { cars } = useAppSelectors(state => state.carReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])
    return (
        <div className='bg-footer'>
            <Header img={'../Images/headerback.jpg'} title='Список автомобилей' />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px]'>
                {cars.length === 0
                    ? <Title>Нет автомобилей в продаже</Title>
                    : cars.map(car => {
                        return <Card card={car} />

                    })}
            </div>
        </div>
    );
};

export default ListCar;
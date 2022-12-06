import React, {useEffect, useMemo, useState} from 'react';
import Header from "../../containers/Header/Header";
import Card from "../../components/common-components/Card/Card";
import { Link } from "react-router-dom";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import Loader from "../../components/common-components/Loader/Loader";
import {getAllCars, ICar} from "../../redux/reducers/Car/carSlice";
import Title from "../../components/common-components/Title/Title";
import {toast} from "react-toastify";
import CarFilter from "../../containers/CarFilter/CarFilter";

const Home: React.FC = () => {
    const { currentUser, isLoading, status } = useAppSelectors(state => state.userReducer)
    const { cars } = useAppSelectors(state => state.carReducer)

    const [listCar, setListCar] = useState(cars)
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedCar = useMemo(() => {
        if(filter.sort) {
            if(filter.sort === 'modelasc') {
                return [...listCar].sort((a: ICar, b: ICar) => (a.model > b.model) ? 1 : -1)
            }
            if(filter.sort === 'modeldesc') {
                return [...listCar].sort((a: ICar, b: ICar) => (a.model < b.model) ? 1 : -1)
            }
            if(filter.sort === "priceasc") {
                return [...listCar].sort((a: ICar, b: ICar) => a.price - b.price)
            }
            if(filter.sort === "pricedesc") {
                return [...listCar].sort((a: ICar, b: ICar) => b.price - a.price)
            }
        }
        return listCar
    },[filter.sort, listCar])

    const sortedAndSearchedCars = useMemo(() => {
        return sortedCar.filter(car => car.model.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedCar])

    return (
        <div className='bg-footer'>
            <Header img={'../Images/headerback.jpg'} title={`${currentUser.username}, Welcome to CardShop`} />
            <div className='max-w-[1200px] m-auto mb-[20px]'>
                <CarFilter filter={filter} setFilter={setFilter} />
            </div>
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px]'>
                {isLoading && <Loader />}
                {cars.length === 0
                    ? <Title>Нет автомобилей в продаже</Title>
                    : sortedAndSearchedCars.map(car => {
                        return <Link key={car.brand + car.model.toUpperCase()} to={`/shop/${car.pathUrl}`}>
                            <Card card={car} />
                        </Link>
                    })}
            </div>
        </div>
    );
};

export default Home;
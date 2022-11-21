import React, {useEffect} from 'react';
import Header from "../../containers/Header/Header";
import Card from "../../components/common-components/Card/Card";
import { Link } from "react-router-dom";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import Loader from "../../components/common-components/Loader/Loader";
import {getAllCars} from "../../redux/reducers/Car/carSlice";
import Title from "../../components/common-components/Title/Title";
import {toast} from "react-toastify";

const Home: React.FC = () => {
    const { currentUser, isLoading, status } = useAppSelectors(state => state.userReducer)
    const { cars } = useAppSelectors(state => state.carReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCars())
        toast(status)
    }, [dispatch])

    return (
        <div className='bg-footer'>
            <Header img={'../Images/headerback.jpg'} title={`${currentUser.username}, Welcome to CardShop`} />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px]'>
                {isLoading && <Loader />}
                {cars.length === 0
                    ? <Title>Нет автомобилей в продаже</Title>
                    : cars.map(car => {
                        return <Link key={car.brand + car.model.toUpperCase()} to={`/shop/${car.pathUrl}`}>
                            <Card card={car} />
                        </Link>
                    })}
            </div>
        </div>
    );
};

export default Home;
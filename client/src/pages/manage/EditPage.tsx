import React, {useEffect} from 'react';
import Header from "../../containers/Header/Header";
import {getAllCars, ICar} from "../../redux/reducers/Car/carSlice";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {Link} from "react-router-dom";
import Card from "../../components/common-components/Card/Card";

const EditPage: React.FC = () => {

    const { cars } = useAppSelectors(state => state.carReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCars())
    }, [dispatch])

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Изменение автомобиля' />
            <div className='max-w-[1200px] m-auto flex justify-between items-center flex-wrap gap-x-[64px] gap-y-[80px]'>
                {cars.map(car => {
                    return <Link to={`/edit/${car._id}`}>
                        <Card card={car} isRemove />
                    </Link>
                })}
            </div>
        </div>
    );
};

export default EditPage;
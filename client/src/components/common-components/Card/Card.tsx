import React, {useCallback, useState} from 'react';
import {ICar, removeCar} from '../../../redux/reducers/Car/carSlice';
import Like from "../Like/Like";
import {useAppDispatch} from "../../../hooks/redux";
import Remove from "../Remove/Remove";
import axios from "../../../api/axios/axios";
import {useParams} from "react-router-dom";

interface ICard {
    card: ICar
    isRemove?: boolean
}

const Card = ({ card, isRemove = false }: ICard) => {
    const [isActive, setIsActive] = useState(false)

    const dispatch = useAppDispatch()

    const handleRemove = useCallback( async () => {
        dispatch(removeCar(card._id))
    },[])

    return (
        <div className='shadow-md max-w-[280px] w-[100%] p-[30px] bg-white rounded-[20px] hover:bg-grey hover:opacity-80'>
            <div className='flex justify-between items-center mb-[5px]'>
                <p className='text-primary text-lg font-semiBold'>{card.brand} {card.model}</p>
                {isRemove ? <Remove onClick={handleRemove} /> : <Like />}
            </div>
            <p className='text-sm font-semiBold text-gray-600 mb-[16px]'>{card.type}</p>
            {card.imgUrl && (
                <img
                    src={`http://localhost:5000/Image/Cars/${card.imgUrl}`}
                    alt={card.model}
                    className='object-cover w-full mb-[20px]'
                />
            )}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[20px]'>
                    <p className={'text-sm font-semiBold text-gray-600'}>{card.drive}</p>
                    <p className={'text-sm font-semiBold text-gray-600'}>{card.transmission}</p>
                </div>
                <p className='text-lg font-semiBold text-secondary'>${card.price}</p>
            </div>
        </div>
    );
};

export default Card;
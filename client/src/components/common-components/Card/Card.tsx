import React, {useState} from 'react';
import { ICar } from '../../../redux/reducers/Car/carSlice';
import Like from "../Like/Like";
import axios from "../../../api/axios/axios";
import {useParams} from 'react-router-dom'
import {useAppDispatch} from "../../../hooks/redux";
import {addCarWishlist} from "../../../redux/reducers/user/userSlice";
import {toast} from "react-toastify";

interface ICard {
    card: ICar
}

const Card = ({ card }: ICard) => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useAppDispatch()


    const handleLike = async () => {
        const {data} = await axios.put(`car/addWishlist/${card._id}`)
        dispatch(addCarWishlist())
        console.log('like ', data)
        toast(data)
        setIsActive(!isActive)
    }

    return (
        <div className='shadow-md max-w-[280px] w-[100%] p-[30px] bg-white rounded-[20px] hover:bg-grey hover:opacity-80'>
            <div className='flex justify-between items-center mb-[5px]'>
                <p className='text-primary text-lg font-semiBold'>{card.brand} {card.model}</p>
                <Like onClick={handleLike} isActive={isActive}/>
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
import React, {useState} from 'react';
import Price from "../Price/Price";
import { ICar } from '../../../redux/reducers/Car/carSlice';
import Like from "../Like/Like";

interface ICard {
    card: ICar
}

const Card = ({ card }: ICard) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const handleLike = () => {
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
        // <div className='relative max-w-[310px] w-[100%] h-[400px] p-[10px] rounded-[10px] hover:opacity-80 hover:bg-grey hover:z-20 hover:cursor-pointer'
        //     onMouseEnter={() => setIsHovered(true)}
        //     onMouseLeave={() => setIsHovered(false)}
        // >
        //     <div className={`${isHovered ? 'visible' : 'hidden'}
        //     absolute pl-[10px] pr-[10px] pt-[23px] pb-[23px] z-30 border-1 border-solid
        //     border-white rounded-[5px] max-w-[161px] w-[100%] top-[62%] left-[50%] translate-x-[-50%] bg-primary text-white text-centre`}>
        //         Add to card
        //     </div>
        //     {card.imgUrl && (
        //         <img
        //             src={`http://localhost:5000/Image/Cars/${card.imgUrl}`}
        //             alt={card.model}
        //             className='object-cover w-full'
        //         />
        //     )}
        //
        //     <div className='flex justify-between items-center w-[100%] flex-row gap-x-[10px]'>
        //         <p className='text-primary text-[20px] font-semiBold text-start truncate text-ellipsis'>{card.brand} {card.model}</p>
        //         <Price>{card.price}</Price>
        //     </div>
        // </div>
    );
};

export default Card;
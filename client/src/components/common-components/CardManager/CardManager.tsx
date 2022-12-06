import React from 'react';

interface ICardManager{
    managerName: string
    managerEmail: string
    managerCount: number
}

const CardManager = ({ managerCount, managerName, managerEmail }: ICardManager) => {
    return (
        <div className='border-2 border-primary rounded-[15px] p-[10px] w-[300px]'>
            <p className='text-primary text-lg font-semiBold'>{`Имя: ${managerName}`}</p>
            <p className='text-primary text-lg font-semiBold'>{`Email: ${managerEmail}`}</p>
            <p className='text-primary text-lg font-semiBold'>{`Кол-во продаж: ${managerCount}`}</p>
        </div>
    );
};

export default CardManager;
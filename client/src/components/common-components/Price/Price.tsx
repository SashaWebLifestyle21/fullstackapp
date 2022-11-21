import React from 'react';

interface IPrice {
    children: React.ReactNode
}


const Price = ({ children }: IPrice) => {
    return (
        <p className='font-semiBold text-[24px] text-secondary'>
            ${children}
        </p>
    );
};

export default Price;
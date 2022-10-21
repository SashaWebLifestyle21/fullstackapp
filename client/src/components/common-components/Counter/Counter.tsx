import React from 'react';
import Button from "../Button/Button";

const Counter = () => {
    return (
        <div className='w-[124px] h-[46px] border-y-[1px] border-primary border-solid flex items-center justify-center'>
            <button className='w-1/3 h-[100%]'>+</button>
            <div className='bg-primary text-white w-[33%] h-[100%] text-center px-[16px] py-[11px]'>1</div>
            <button className='w-1/3 h-[100%]'>-</button>
        </div>
    );
};

export default Counter;
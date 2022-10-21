import React, {useState} from 'react';

interface ICheckbox {
    checked?: boolean
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const Checkbox = ({ checked, name, onChange }: ICheckbox) => {

    return (
        <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer
        ${checked ? 'border-2 border-solid border-primary' : 'border-none'}
        `}>
            <div className={`bg-${name} border-[1px] border-black w-[30px] h-[30px] rounded-full cursor-pointer`}>
                <input
                    type='checkbox'
                    name={name}
                    checked={checked}
                    className='w-[100%] h-[100%] block opacity-0 cursor-pointer'
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Checkbox;
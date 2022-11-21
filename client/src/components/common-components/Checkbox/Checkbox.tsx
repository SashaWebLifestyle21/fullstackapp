import React, {useState} from 'react';

interface ICheckbox {
    checked?: boolean
    name?: string
    label?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const Checkbox = ({ checked, name, onChange, label }: ICheckbox) => {

    return (
        <div className={`rounded-lg flex items-center justify-center cursor-pointer
        ${checked ? 'border-2 border-solid border-white bg-primary' : 'border-none'}
        `}>
            <div className={`border-[1px] p-[5px] h-[40px] rounded-lg text-center cursor-pointer ${checked ? 'border-none' : 'border-black'}`}>
                <label className={`cursor-pointer text-center block w-[100%] h-[100%] ${checked ? 'text-white' : 'text-primary'}`}
                >
                    {label}
                <input
                    type='checkbox'
                    name={name}
                    checked={checked}
                    className='w-[100%] h-[100%] block opacity-0 cursor-pointer'
                    onChange={onChange}
                />
                </label>
            </div>
        </div>
    );
};

export default Checkbox;
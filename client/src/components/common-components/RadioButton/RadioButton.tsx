import React, {useState} from "react";

interface IRadioButton {
    value?: string | number
    name?: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    color?: string
    label?: string
}

const RadioButton = ({ value, name, checked, onChange, className, color='bg-primary', label }: IRadioButton) => {

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer
                ${checked ? 'border-2 border-solid border-primary' : 'border-none'}`}>
                <div className={`border-[1px] border-black w-[30px] h-[30px] rounded-full cursor-pointer` + color}>
                    <input
                        id={name}
                        type='radio'
                        checked={checked}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className='w-[100%] h-[100%] block opacity-0 cursor-pointer'
                    />
                </div>
            </div>
        </>
    )
}

export default RadioButton
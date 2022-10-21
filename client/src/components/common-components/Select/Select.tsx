import React, {Dispatch, SetStateAction, useState } from 'react';
import Image from "../Image/Image";

interface ISelect {
    options?: any[]
    select?: string
    selected: string
    setSelected: Dispatch<SetStateAction<string>>
}

const Select = ({ options, select='select', selected, setSelected }: ISelect) => {
    // const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    return (
        <div className="w-72 font-medium">
            <div
                className={`bg-white text-primary w-full mb-[15px] flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}
                onClick={() => setOpen(!open)}
            >
                {selected ? selected : select}
                {!open
                ? <Image src={'../Icons/down.png'} alt={'down'} className={'cursor-pointer'} />
                : <Image src={'../Icons/up.png'} alt={'up'} className={'cursor-pointer'} />}
            </div>
            <ul
                className={`bg-white mt-2 overflow-y-auto ${
                    open ? "max-h-60" : "max-h-0"
                } `}
            >
                {options?.map(option => {
                    return <li
                        key={option.id}
                        className={`p-2 text-sm cursor-pointer hover:bg-primary hover:text-white 
                        ${option?.value?.toLowerCase() === selected?.toLowerCase() && 'bg-primary text-white'}
                        ${open ? 'block' : 'hidden'}`}
                        onClick={() => {
                            if(option?.value.toLowerCase() !== selected.toLowerCase()) {
                                setSelected(option?.value)
                                setOpen(false)
                            }
                        }
                        }
                    >
                        {option.value}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Select;
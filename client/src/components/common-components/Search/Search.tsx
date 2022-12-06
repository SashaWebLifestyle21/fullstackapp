import React from 'react';

interface ISearch {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ value, onChange }: ISearch) => {
    return (
        <input
            value={value}
            placeholder='Поиск'
            className='border-2 rounded-[5px] p-[5px] outline-none text-primary font-semiBold focus:border-b-secondary'
            onChange={onChange}
        />
    );
};

export default Search;
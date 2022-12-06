import React from 'react';

interface ISortSelect {
    options: any[]
    onChange: (e: string) => void
    value?: string
    defaultValue?: string
}

const SortSelect = ({ options, onChange, defaultValue, value }: ISortSelect) => {
    return (
        <select value={value} onChange={event => onChange(event.target.value)}>
            <option disabled value=''>{defaultValue}</option>
            {options.map(option => {
                return <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            })}
        </select>
    );
};

export default SortSelect;
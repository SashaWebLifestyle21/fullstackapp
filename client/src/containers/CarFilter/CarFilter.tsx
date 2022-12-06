import React from 'react';
import Search from "../../components/common-components/Search/Search";
import SortSelect from "../../components/common-components/Sort/SortSelect";
import {optionsSort} from "../../constants/optionsSort";

interface IFilter {
    sort: string
    query: string
}

interface ICarFilter {
    filter: IFilter
    setFilter: (obj: IFilter) => void
}

const CarFilter = ({ filter, setFilter }: ICarFilter) => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <SortSelect defaultValue={'По умолчанию'} value={filter.sort} options={optionsSort} onChange={selectedSort => setFilter({...filter, sort: selectedSort})} />
            </div>
            <div>
                <Search value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})} />
            </div>
        </div>
    );
};

export default CarFilter;
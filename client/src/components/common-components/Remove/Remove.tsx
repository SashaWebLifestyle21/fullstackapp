import React from 'react';

interface IRemove {
    onClick?: () => void
}

const Remove = ({ onClick }: IRemove) => {

    return (
        <div onClick={onClick} className='z-30'>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.12662L14.8148 0.983765L8 7.84091L1.18519 0.983765L0 2.12662L6.85714 8.98391L0 15.8409L1.18519 16.9838L8 10.1266L14.8571 16.9838L16 15.8409L9.14286 8.98391L16 2.12662Z" fill="#C1C4C6"/>
            </svg>
        </div>
    );
};

export default Remove;
import React from 'react';

interface ILike {
    isActive?: boolean
    onClick?: () => void
}

const Like = ({ isActive, onClick }: ILike) => {
    return (
        <div onClick={onClick} className='z-30'>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4259 1.5C16.3611 1.5 18.3333 4.29375 18.3333 6.9C18.3333 12.1781 10.1481 16.5 9.99996
                16.5C9.85181 16.5 1.66663 12.1781 1.66663 6.9C1.66663 4.29375 3.63885 1.5 6.57403 1.5C8.25922 1.5
                9.36107 2.35312 9.99996 3.10312C10.6388 2.35312 11.7407 1.5 13.4259 1.5Z"
                      fill={isActive ? "#F03D3D" : "none"} stroke="#768898" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
};

export default Like;
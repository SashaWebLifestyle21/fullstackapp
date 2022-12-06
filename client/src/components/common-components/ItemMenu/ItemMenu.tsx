import React from 'react';
import Image from "../Image/Image";
import Title from "../Title/Title";
import {Link} from "react-router-dom";

interface IItemMenu{
    link: string
    img?: string
    title: string
}

const ItemMenu = ({ link, img, title }: IItemMenu) => {
    return (
        <div className='w-1/4 border-[4px] border-solid border-primary rounded-[10px]
            transition-all duration-300 ease-linear hover:bg-grey opacity-80 z-20 overflow-hidden cursor-pointer'>
            <Link to={link}
            >
                <Image src={`../Images/${img}.png`} className='w-[70px] h-[70px] m-auto' />
                <Title>{title}</Title>
            </Link>
        </div>
    );
};

export default ItemMenu;
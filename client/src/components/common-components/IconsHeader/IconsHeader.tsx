import React from 'react';
import Image from "../Image/Image";
import {linksHeader} from "../../../constants/linksHeader";
import {Link} from "react-router-dom";

interface IIconsHeader {
    logoutHandler: () => void
    roleUser: string
}

const IconsHeader = ({ logoutHandler, roleUser }: IIconsHeader) => {
    return (
        <div className='flex items-center justify-center gap-x-[20px]'>
            {roleUser === 'USER' && <Image src='../../Icons/search.svg' alt='search' className='cursor-pointer'/>}
            {roleUser === 'USER' && linksHeader.map(item => {
                return <Link to={`/${item.href}`} key={item.id}>
                    <Image src={`../../Icons/${item.name}.svg`} alt={item.name} />
                </Link>
            })}
            <Image onClick={logoutHandler} className='w-[24px] h-[24px] cursor-pointer' src={'../Images/exit.png'} alt={"exit"}/>
        </div>
    );
};

export default IconsHeader;
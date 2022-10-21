import React from 'react';
import Image from "../Image/Image";
import { linksFooter } from "../../../constants/linksFooter";

const IconsFooter: React.FC = () => {
    return (
        <div className='flex items-center justify-center gap-x-[15px]'>
            {linksFooter.map(item => {
                return <a
                    href={item.href}
                    target='_blank'
                    key={item.id}
                >
                    <Image src={`../../Icons/${item.name}.svg`} alt={item.name} className='w-[20px] h-[20px]'/>
                </a>
            })}
        </div>
    );
};

export default IconsFooter;
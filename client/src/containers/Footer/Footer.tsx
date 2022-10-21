import React from 'react';
import Logo from "../../components/common-components/Logo";
import IconsFooter from "../../components/common-components/IconsFooter/IconsFooter";

const Footer = () => {
    return (
        <div className='bg-footer p-[24px]'>
            <div>
                <div className='flex justify-between '>
                    <Logo />
                    <IconsFooter />
                </div>
            </div>
        </div>
    );
};

export default Footer;
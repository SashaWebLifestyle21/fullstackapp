import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../../components/common-components/Image/Image";
import Title from '../../components/common-components/Title/Title';
import { manageMenu } from '../../constants/manageMenu';
import ItemMenu from "../../components/common-components/ItemMenu/ItemMenu";

const ManageMenu: React.FC = () => {
    return (
        <div className='flex items-center justify-center gap-x-[50px]'>
            {manageMenu.map(item => {
                return <ItemMenu key={item.title} link={item.link} title={item.title} img={item.img} />
            })}
        </div>
    );
};

export default ManageMenu;
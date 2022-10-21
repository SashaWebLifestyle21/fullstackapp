import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../../components/common-components/Image/Image";
import Title from '../../components/common-components/Title/Title';

const AdminMenu: React.FC = () => {
    return (
        <div>
            <Link to='/addManage' className='block w-[230px] border-[4px] border-solid border-primary rounded-[10px]
            transition-all duration-300 ease-linear hover:bg-grey opacity-80 z-20 cursor-pointer'
            >
                <Image src='../Images/addManage.png' className='w-[70px] h-[70px] m-auto' />
                <Title>Добавить менеджера</Title>
            </Link>
        </div>
    );
};

export default AdminMenu;
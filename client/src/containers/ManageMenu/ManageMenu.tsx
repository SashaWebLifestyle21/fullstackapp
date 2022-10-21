import React from 'react';
import { Link } from 'react-router-dom';
import Image from "../../components/common-components/Image/Image";
import Title from '../../components/common-components/Title/Title';

const ManageMenu: React.FC = () => {
    return (
        <div>
            <Link to='/createCar' className='block w-[230px] border-[4px] border-solid border-primary rounded-[10px]
            transition-all duration-300 ease-linear hover:bg-grey opacity-80 z-20 cursor-pointer'
            >
                <Image src='../Images/addcar.png' className='w-[70px] h-[70px] m-auto' />
                <Title>Добавить автомобиль</Title>
            </Link>
        </div>
    );
};

export default ManageMenu;
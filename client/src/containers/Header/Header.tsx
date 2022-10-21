import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../../components/common-components/Logo";
import Title from "../../components/common-components/Title/Title";
import Image from "../../components/common-components/Image/Image";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {logout} from "../../redux/reducers/user/userSlice";
import {toast} from "react-toastify";
import IconsHeader from "../../components/common-components/IconsHeader/IconsHeader";

interface IHeader {
    img: string
    title: string
}

const Header = ({ img, title }: IHeader) => {
    const { token, currentUser } = useAppSelectors(state => state.userReducer)
    const isAuth = Boolean(token)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('userToken')
        toast('Вы вышли из системы')
        navigate('/')
    }
    return (
        <div style={{backgroundImage: `url(${img})`}} className='mb-[40px] pb-[50px]'>
            <div className='container'>
                <div className='flex justify-between mb-[70px] pt-[24px] pb-[24px]'>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                    {isAuth && <div>
                        <IconsHeader logoutHandler={logoutHandler} roleUser={currentUser.role} />
                    </div>}
                </div>
                <Title className='w-[150px] mb-[140px]'>{title}</Title>
            </div>
        </div>
    );
};

export default Header;
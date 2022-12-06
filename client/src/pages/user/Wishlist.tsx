import React, {useCallback, useEffect, useState} from 'react';
import { ICar } from "../../redux/reducers/Car/carSlice";
import Header from "../../containers/Header/Header";
import TableWishlist from "../../containers/TableWishlist/TableWishlist";
import { useAppDispatch, useAppSelectors } from "../../hooks/redux";
import { removeCarWishlist } from "../../redux/reducers/user/userSlice";
import {toast} from "react-toastify";
import Title from "../../components/common-components/Title/Title";
import Button from "../../components/common-components/Button/Button";
import {Link} from "react-router-dom";

const Wishlist = () => {




    return (
        <>
            <Header img={'../Images/headerback.jpg'} title={'Понравившиеся'} />
            <div className='max-w-[1200px] m-auto '>
              <div className={'flex items-center justify-center flex-col gap-[20px] mb-[100px]'}>
                            <Title>Нет понравившихся автомобилей</Title>
                            <Link to='/home'>
                                <Button className='border-2 border-solid border-primary hover:bg-primary hover:text-white'
                                >
                                    Перейти к выбору авто
                                </Button>
                            </Link>
                    </div>)
                {/*: <TableWishlist cars={carsWishlist} removeHandler={removeCarWishlistHandler}/>*/}
            </div>
        </>
    );
};

export default Wishlist;
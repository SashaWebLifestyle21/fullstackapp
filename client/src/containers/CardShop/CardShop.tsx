import React, {useState} from 'react';
import Header from "../Header/Header";
import { ICar } from '../../redux/reducers/Car/carSlice';
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {createOrder} from "../../redux/reducers/Order/orderSlice";


interface ICardShop {
    card: ICar
}

const CardShop = ({ card }: ICardShop) => {

    const dispatch = useAppDispatch()

    const handlerBuy = async () => {
        dispatch(createOrder(card._id))
    }

    return (
        <>
            <Header img={'../Images/shopback.jpg'} title={'Shop'} />
            <div className='shadow-lg px-[95px] py-[25px] flex items-center justify-between'>
                <p className='font-medium text-2xl'>
                    <span className='font-semiBold text-3xl'>{card.brand.toUpperCase()}</span>
                    &nbsp;
                    {card.model}
                </p>
                <div className='flex items-center justify-center gap-x-[5px]'>
                    <div className={`h-[7px] w-[7px] rounded ${card.count === 0 ? 'bg-red' : 'bg-green-500'}`}></div>
                    {card.count === 0 ? <p>Нет в наличии</p> : <p>В наличии</p>}
                </div>
            </div>
            <div className='flex items-center p-[5px]'>
                <div className='w-3/6'>
                    {card.imgUrl && (
                        <img
                            src={`http://localhost:5000/Image/Cars/${card.imgUrl}`}
                            alt={card.model}
                            className='object-cover w-full mb-[20px] rounded-[10px]'
                        />
                    )}
                </div>
                <div className='p-[32px] w-3/6'>
                    <p className='font-light text-4xl mb-[16px]'>Двигатель</p>
                    <p className='font-light text-2xl text-primary mb-[32px]'>{card.engine}</p>
                    <div className='flex items-center justify-between gap-x-[60px] mb-[35px]'>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Тип двигателя:</p>
                            <p className='text-sm font-medium'>{card.fuel}</p>
                        </div>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Мощность:</p>
                            <p className='text-sm font-medium'>{card.power}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-x-[60px] mb-[35px]'>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Разгон от 0 до 100:</p>
                            <p className='text-sm font-medium'>{card.acceleration} сек.</p>
                        </div>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Тип кузова:</p>
                            <p className='text-sm font-medium'>{card.type}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-x-[60px] mb-[35px]'>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Привод:</p>
                            <p className='text-sm font-medium'>{card.drive}</p>
                        </div>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Трансмиссия:</p>
                            <p className='text-sm font-medium'>{card.transmission}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-x-[60px] mb-[35px]'>
                        <div className='flex items-center justify-between w-3/6'>
                            <p className='text-sm font-medium'>Цвет:</p>
                            <p className='text-sm font-semiBold'>{card.color}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black shadow-lg flex items-center justify-between p-[5px]'>
                <p className='font-medium text-3xl text-secondary w-3/6 py-[25px] pl-[95px]'>
                    <span className='font-semiBold text-3xl text-white'>Цена:</span>
                    &nbsp;
                    ${card.price}
                </p>

                    <Button className='w-3/6 bg-secondary h-full font-semiBold text-3xl text-white py-[25px] hover:bg-pink-900 hover:font-bold hover:text-4xl'
                            onClick={handlerBuy}
                    >
                        Купить
                    </Button>

            </div>
        </>
    );
};

export default CardShop
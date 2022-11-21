import React from 'react';
import Header from "../../containers/Header/Header";
import Button from "../../components/common-components/Button/Button";

interface IBuy {
    _id: string
    brand: string
    model: string
    engine: string
    fuel: string
    type: string
    power: string
    acceleration: string
    drive: string
    color: string
    transmission: string
    price: number
    imgUrl: string
    pathUrl: string
}

const Buy = () => {
    return (
        <>
            <Header img={'../Images/shopback.jpg'} title={'Покупка'} />
            <div className='shadow-lg px-[95px] py-[25px]'>
                <p className='font-medium text-2xl'>
                    {/*<span className='font-semiBold text-3xl'>{card.brand.toUpperCase()}</span>*/}
                    &nbsp;
                    {/*{card.model}*/}
                </p>
            </div>
            <div className='flex items-center p-[5px]'>
                <div className='w-3/6'>
                    {/*/!*{card.imgUrl && (*!/*/}
                    {/*    <img*/}
                    {/*        // src={`http://localhost:5000/Image/Cars/${card.imgUrl}`}*/}
                    {/*        // alt={card.model}*/}
                    {/*        className='object-cover w-full mb-[20px] rounded-[10px]'*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
                <div className='p-[32px] w-3/6'>
                    <div className='flex items-center justify-between w-3/6'>
                        <p className='text-sm font-medium'>Тип двигателя:</p>
                        {/*<p className='text-sm font-medium'>{card.fuel}</p>*/}
                    </div>
                </div>
            </div>
            <div className='bg-black shadow-lg flex items-center justify-between p-[5px]'>
                <p className='font-medium text-3xl text-secondary w-3/6 py-[25px] pl-[95px]'>
                    <span className='font-semiBold text-3xl text-white'>Цена:</span>
                    &nbsp;
                    {/*${card.price}*/}
                </p>
                <Button className='w-3/6 bg-secondary h-full font-semiBold text-3xl text-white py-[25px] hover:bg-pink-900 hover:font-bold hover:text-4xl'
                >
                    Подтвердить
                </Button>
            </div>
        </>
    );
};

export default Buy;
import React from 'react';
import { tableHeadWishlist } from "../../constants/tableHeadWishlist";
import { ICar } from "../../redux/reducers/Car/carSlice";
import Price from "../../components/common-components/Price/Price";
import { Link } from "react-router-dom";
import Button from "../../components/common-components/Button/Button";
import Image from "../../components/common-components/Image/Image";

interface ITableWishlist {
    cars: ICar[] | null
    removeHandler: (id: string) => void
}

const TableWishlist = ({ cars, removeHandler }: ITableWishlist) => {
    return (
        <>
            {!cars && <p>Нет понравившихся</p>}
            <table className='w-[100%]'>
                <thead>
                <tr>
                    {tableHeadWishlist.map(item => {
                        return <td className='text-primary font-semiBold text-xl text-center p-[5px]'
                                   key={item.id}
                        >
                            {item.text}
                        </td>
                    })}
                </tr>
                </thead>
                <tbody>
                {cars && cars.map(car => {
                    return (
                        <tr key={car.pathUrl + car.model}>
                            <td className='border-y border-lightGrey border-solid text-lg text-primary p-[5px] text-center border-spacing-0'>
                                <div className='flex items-center justify-center gap-x-[30px]'>
                                    {car.imgUrl && (
                                        <img
                                            src={`http://localhost:5000/Image/Cars/${car.imgUrl}`}
                                            alt={car.model}
                                            className='h-[80px] w-[100px]'
                                        />
                                    )}
                                    <div>
                                        <p className='font-semiBold text-3xl'>{car.brand}</p>
                                        <p className='font-medium text-2xl'>{car.model}</p>
                                    </div>
                                </div>
                            </td>
                            <td className='border-y border-lightGrey border-solid text-lg text-primary p-[5px] text-center border-spacing-0'>
                                <Price>{car.price}</Price>
                            </td>
                            <td className='border-y border-lightGrey border-solid text-lg text-primary p-[5px] text-center border-spacing-0'>
                                <Link to={`/shop/${car.pathUrl}`}>
                                    <Button>Перейти</Button>
                                </Link>
                            </td>
                            <td className='border-y border-lightGrey border-solid text-lg text-primary p-[5px] text-center border-spacing-0 cursor-pointer'
                                onClick={() => removeHandler(car._id)}
                            >
                                <Image src={`../../Icons/remove.svg`} alt={'remove'}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
};

export default TableWishlist;
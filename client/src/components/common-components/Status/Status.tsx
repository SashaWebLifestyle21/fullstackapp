import React from 'react';
import {TStatusOrder} from "../../../constants/statusOrder";

interface IStatus {
    status: TStatusOrder
}

const Status = ({ status }: IStatus) => {
    return (
        <>
            {status === 'APPROVED' && <div className='h-[20px] rounded-[20px] bg-green-500 mb-[10px]'>
                <p className='text-white text-center'>Одобрено</p>
            </div>}
            {status === 'PROCESSED' && <div className='h-[20px] rounded-[20px] bg-orange-500 mb-[10px]'>
                <p className='text-white text-center'>В Ожидании</p>
            </div>}
            {status === 'REFUSED' && <div className='h-[20px] rounded-[20px] bg-red mb-[10px]'>
                <p className='text-white text-center'>Отказано</p>
            </div>}
        </>
    )
};

export default Status;
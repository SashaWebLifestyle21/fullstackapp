import React from 'react';
import {ICar} from "../../../redux/reducers/Car/carSlice";
import {IUser} from "../../../redux/reducers/user/userSlice";
import {TStatusOrder} from "../../../constants/statusOrder";
import Status from "../Status/Status";
import Button from "../Button/Button";



export interface IMyOrder {
    car: ICar,
    manager: IUser
    status: TStatusOrder
    user: IUser
    guarantee: string
}

const MyOrder = ({ car, manager, status, user, guarantee }: IMyOrder) => {

    const date = new Date(guarantee)

    const createPDF = async () => {
        // const date = new FormData()
        // date.append('car', car.toString())
        // date.append('manager', manager.toString())
        // date.append('user', user.toString())
        // date.append('status', status)
        // date.append('guarantee', guarantee)
        // const date = {car, manager, user, status, guarantee}
        // await axios.post('/order/createPDF', date)
        // await axios.get('/order/fetchPDF',{ responseType: 'blob' }).then((res) => {
        //     const pdfBlob: any = new Blob([res.data], { type: 'application/pdf' })
        //
        //     saveAs(pdfBlob, 'newPdf.pdf')
        // })
    }

    return (
        <div className='shadow-md max-w-[280px] w-[100%] p-[30px] bg-white rounded-[20px]'>
            <Status status={status} />
            {car.imgUrl && (
                <img
                    src={`http://localhost:5000/Image/Cars/${car.imgUrl}`}
                    alt={car.model}
                    className='object-cover w-full mb-[20px]'
                />
            )}
            <p className='text-primary text-lg font-semiBold'>{car.brand} {car.model}</p>
            <p className='text-primary text-lg font-semiBold'>Цвет: {car.color}</p>
            <p className='text-primary text-lg font-semiBold'>Менеджер: {manager.username}</p>
            <p className='text-primary text-lg font-semiBold'>email: {manager.email}</p>
            <p className='text-primary text-lg font-semiBold'>Дата покупки: {`${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</p>
            <p className='text-secondary text-lg font-semiBold'>Гарантия: </p>
            <p className='text-secondary text-lg font-semiBold'>{`c ${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`}</p>
            <p className='text-secondary text-lg font-semiBold'>{`по ${date.getFullYear()+3}.${date.getMonth()+1}.${date.getDate()}`}</p>
            <Button onClick={createPDF}>Скачать чек</Button>
        </div>
    );
};

export default MyOrder;
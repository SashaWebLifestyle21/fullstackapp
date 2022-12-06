import React, {useEffect, useState} from 'react';
import Button from '../components/common-components/Button/Button';
import FormGroup from '../components/common-components/FormGroup/FormGroup';
import RadioButton from '../components/common-components/RadioButton/RadioButton';
import Select from '../components/common-components/Select/Select';
import { carFuel } from '../constants/carFuel';
import { carTypes } from '../constants/carTypes';
import { colorsCars } from '../constants/ColorsCars';
import { driveCar } from '../constants/driveCar';
import {createCar, ICar, updateCar} from '../redux/reducers/Car/carSlice';
import Header from './Header/Header';
import { useAppDispatch } from "../hooks/redux";

interface ICardEdit {
    card: ICar
}

const EditPage = ({ card }: ICardEdit) => {

    const dispatch = useAppDispatch()

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [fuel, setFuel] = useState('')
    const [power, setPower] = useState('')
    const [acceleration, setAcceleration] = useState('')
    const [drive, setDrive] = useState('')
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)
    const [transmission, setTransmission] = useState('')
    const [colorCar, setColorCar] = useState('')
    const [image, setImage] = useState<any>(null)
    const [oldImage, setOldImage] = useState<any>(null)
    const [carType, setCarType] = useState('')

    useEffect(() => {
        setBrand(card.brand)
        setModel(card.model)
        setEngine(card.engine)
        setFuel(card.fuel)
        setPower(card.power)
        setAcceleration(card.acceleration)
        setDrive(card.drive)
        setPrice(card.price)
        setCount(card.count)
        setTransmission(card.transmission)
        setColorCar(card.color)
        setOldImage(card.imgUrl)
        setCarType(card.type)
    },[])

    const isRadioSelected = (value1: string, value2: string): boolean => {
        return value1 === value2
    }

    const handleTransmission = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransmission(e.currentTarget.value)
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setImage(fileList[0]);
        setOldImage('')
    }

    const handleUpdateCar = () => {
        try {
            const updatedCar = new FormData()
            updatedCar.append('id', card._id)
            updatedCar.append('brand', brand)
            updatedCar.append('model', model)
            updatedCar.append('transmission', transmission)
            updatedCar.append('color', colorCar)
            updatedCar.append('engine', engine)
            updatedCar.append('drive', drive)
            updatedCar.append('type', carType)
            updatedCar.append('acceleration', acceleration)
            updatedCar.append('fuel', fuel)
            updatedCar.append('power', power)
            updatedCar.append('price', price.toString())
            updatedCar.append('count', count.toString())
            updatedCar.append('img', image)
            updatedCar.append('pathUrl', brand.split(' ').join('') + model.split(' ').join(''))
            dispatch(updateCar(updatedCar))
        } catch (e) {
            console.log(e)
        }
    }

    const clearForm = () => {
        setBrand(card.brand)
        setModel(card.model)
        setEngine(card.engine)
        setFuel(card.fuel)
        setPower(card.power)
        setAcceleration(card.acceleration)
        setDrive(card.drive)
        setPrice(card.price)
        setCount(card.count)
        setTransmission(card.transmission)
        setColorCar(card.color)
        setOldImage(card.imgUrl)
        setCarType(card.type)
    }

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Изменение автомобиля' />
            <form
                encType='multipart/form-data'
                className='w-[600px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px] flex flex-col gap-y-[10px]'
                onSubmit={(e) => e.preventDefault()}
            >
                <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                    Изменить изорбажение:
                    <input
                        type='file'
                        className='hidden'
                        onChange={handleImage}
                        name='img'
                    />
                </label>
                <div className='flex object-cover py-2'>
                    {oldImage && (
                        <img
                            src={`http://localhost:5000/Image/Cars/${oldImage}`}
                            alt={oldImage.name}
                        />
                    )}
                    {image && (
                        <img src={URL.createObjectURL(image)} alt={image.name} />
                    )}
                </div>
                <FormGroup
                    labelName={'brand'}
                    labelText={'Введите марку автомобиля'}
                    inputName={'brand'}
                    inputType={'text'}
                    placeholder={'BMW'}
                    value={brand}
                    onChange={e => setBrand(e.currentTarget.value)}
                />
                <FormGroup
                    labelName={'model'}
                    labelText={'Введите модель автомобиля'}
                    inputName={'model'}
                    inputType={'text'}
                    placeholder={'5 series'}
                    value={model}
                    onChange={e => setModel(e.currentTarget.value)}
                />
                <FormGroup
                    labelName={'engine'}
                    labelText={'Обьем двигателя'}
                    inputName={'engine'}
                    inputType={'text'}
                    placeholder={'3000'}
                    value={engine}
                    onChange={e => setEngine(e.currentTarget.value)}
                />
                <div className='flex items-center gap-[10px]'>
                    <p className='text-primary'>Тип двигателя: </p>
                    {carFuel.map(fuelcar => {
                        return <RadioButton
                            key={fuelcar.id}
                            label={fuelcar.value}
                            name={fuelcar.fuel}
                            checked={isRadioSelected(fuelcar.value, fuel)}
                            value={fuelcar.value}
                            onChange={(e) => setFuel(e.currentTarget.value)}
                        />
                    })}
                </div>
                <FormGroup
                    labelName={'acceleration'}
                    labelText={'Разгон до 100'}
                    inputName={'acceleration'}
                    inputType={'text'}
                    placeholder={'6.4'}
                    value={acceleration}
                    onChange={e => setAcceleration(e.currentTarget.value)}
                />
                <div className='flex items-center gap-[10px]'>
                    <p className='text-primary'>Привод: </p>
                    {driveCar.map(drivecar => {
                        return <RadioButton
                            key={drivecar.id}
                            label={drivecar.value}
                            name={drivecar.value}
                            checked={isRadioSelected(drivecar.value, drive)}
                            value={drivecar.value}
                            onChange={(e) => setDrive(e.currentTarget.value)}
                        />
                    })}
                </div>
                <FormGroup
                    labelName={'power'}
                    labelText={'Мощность'}
                    inputName={'power'}
                    inputType={'text'}
                    placeholder={'250'}
                    value={power}
                    onChange={e => setPower(e.currentTarget.value)}
                />
                <Select
                    options={carTypes}
                    select={'Тип кузова'}
                    selected={carType}
                    setSelected={setCarType}
                />
                <div className='flex items-center flex-wrap gap-[10px]'>
                    <p className='text-primary'>Цвет: </p>
                    {colorsCars.map(color => {
                        return <RadioButton
                            key={color.id}
                            label={color.value}
                            name={color.value}
                            checked={isRadioSelected(color.value, colorCar)}
                            value={color.value}
                            onChange={(e) => setColorCar(e.currentTarget.value)}
                        />
                    })}
                </div>
                <div className='flex items-center gap-[10px]'>
                    <p className='mr-[20px] text-primary'>КПП</p>
                    <label htmlFor="mechanic">МКПП</label>
                    <div key={card.transmission + card._id} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer flex
                        ${isRadioSelected('МКПП', transmission) ? 'border-2 border-solid border-primary' : 'border-none'}`}>
                        <div className={`bg-primary border-[1px] border-black w-[30px] h-[30px] rounded-full cursor-pointer`}>
                            <input
                                id='mechanic'
                                type='radio'
                                checked={isRadioSelected('МКПП', transmission)}
                                value={'МКПП'}
                                onChange={handleTransmission}
                                className='w-[100%] h-[100%] block opacity-0 cursor-pointer'
                            />
                        </div>
                    </div>
                    <label htmlFor="auto">АКПП</label>
                    <div key={card._id + card.transmission} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer flex
                         ${isRadioSelected('АКПП', transmission) ? 'border-2 border-solid border-primary' : 'border-none'}`}>
                        <div className={`bg-primary border-[1px] border-black w-[30px] h-[30px] rounded-full cursor-pointer`}>
                            <input
                                id='auto'
                                type='radio'
                                checked={isRadioSelected('АКПП', transmission)}
                                value={'АКПП'}
                                onChange={handleTransmission}
                                className='w-[100%] h-[100%] block opacity-0 cursor-pointer'
                            />
                        </div>
                    </div>
                </div>
                <FormGroup
                    labelName={'count'}
                    labelText={'Количество'}
                    inputName={'count'}
                    inputType={'number'}
                    placeholder={'7'}
                    value={count}
                    onChange={e => setCount(Number(e.currentTarget.value))}
                />
                <FormGroup
                    labelName={'price'}
                    labelText={'Цена'}
                    inputName={'price'}
                    inputType={'number'}
                    placeholder={'50000'}
                    value={price}
                    onChange={e => setPrice(Number(e.currentTarget.value))}
                />
                <div className='flex items-center justify-center gap-8'>
                    <Button
                        className='bg-primary text-white block m-auto'
                        onClick={handleUpdateCar}
                    >
                        Изменить
                    </Button>
                    <Button
                        className='bg-secondary text-white block m-auto'
                        onClick={clearForm}
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditPage;
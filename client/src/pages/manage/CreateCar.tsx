import React, {useEffect, useState } from 'react';
import FormGroup from '../../components/common-components/FormGroup/FormGroup';
import Header from '../../containers/Header/Header';
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {createCar} from "../../redux/reducers/Car/carSlice";
import Select from "../../components/common-components/Select/Select";
import { carTypes } from '../../constants/carTypes';
import Checkbox from "../../components/common-components/Checkbox/Checkbox";
import { colorsCars, IColorsCars } from "../../constants/ColorsCars";
import { carFuel } from '../../constants/carFuel';
import RadioButton from "../../components/common-components/RadioButton/RadioButton";
import {driveCar} from "../../constants/driveCar";
import {toast} from "react-toastify";

const CreateCar: React.FC = () => {

    const { status } = useAppSelectors(state => state.carReducer)

    useEffect(() => {
        setColors(colorsCars);
        if(status) toast(status)
    }, [status]);

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')
    const [fuel, setFuel] = useState('')
    const [power, setPower] = useState('')
    const [acceleration, setAcceleration] = useState('')
    const [drive, setDrive] = useState('')
    const [price, setPrice] = useState(0)
    const [transmission, setTransmission] = useState('АКПП')
    const [colors, setColors] = useState<IColorsCars[]>([])
    const [image, setImage] = useState<any>(null)
    const [carType, setCarType] = useState('')

    const dispatch = useAppDispatch()

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        let tempColors = colors.map(color => color.color === name ? { ...color, isChecked: checked } : color)
        setColors(tempColors)
    }

    const isRadioSelected = (value1: string, value2: string): boolean => {
        return value1 === value2
    }

    const handleTransmission = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransmission(e.currentTarget.value)
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        console.log(fileList[0])
        setImage(fileList[0]);
    }

    const handleCreateCar = () => {
        try {
            let colorsCar: string[] = []
            colors.forEach(item => {
                if(item.isChecked) {
                    colorsCar.push(item.value)
                }
            })
            const data = new FormData()
            data.append('brand', brand)
            data.append('model', model)
            data.append('transmission', transmission)
            data.append('color', JSON.stringify(colorsCar))
            data.append('engine', engine)
            data.append('drive', drive)
            data.append('type', carType)
            data.append('acceleration', acceleration)
            data.append('fuel', fuel)
            data.append('power', power)
            data.append('price', price.toString())
            data.append('img', image)
            dispatch(createCar(data))
        } catch (e) {
            console.log(e)
        }
    }

    const clearForm = () => {
        setBrand('')
        setModel('')
        setEngine('')
        setColors([])
        setTransmission('')
        setPrice(0)
    }

    return (
        <div>
            <Header img={'../Images/headerback.jpg'} title='Создание автомобиля' />
            <form
                encType='multipart/form-data'
                className='w-[600px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px] flex flex-col gap-y-[10px]'
                onSubmit={(e) => e.preventDefault()}
            >
                <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                    Прикрепить изорбажение:
                    <input
                        type='file'
                        className='hidden'
                        onChange={handleImage}
                        name='img'
                    />
                </label>
                <div className='flex object-cover py-2'>
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
                <div className='flex items-center gap-[10px]'>
                    <p className='text-primary'>Цвета: </p>
                    {colors.map(color => {
                        return <Checkbox
                            key={color.id}
                            checked={color?.isChecked || false}
                            name={color.color}
                            onChange={handleColor}
                        />
                    })}
                </div>
                <div className='flex items-center gap-[10px]'>
                    <p className='mr-[20px] text-primary'>КПП</p>
                    <label htmlFor="mechanic">МКПП</label>
                    <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer flex
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
                    <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer flex
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
                        onClick={handleCreateCar}
                    >
                        Создать
                    </Button>
                    <Button
                        className='bg-secondary text-white block m-auto'
                        onClick={clearForm}
                    >
                        Отменить
                    </Button>
                </div>
            </form>
            createCar
        </div>
    );
};

export default CreateCar;
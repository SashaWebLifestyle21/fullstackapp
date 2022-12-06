import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {AxiosRequestConfig} from "axios";

export interface ICar {
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
    count: number
    imgUrl: string
    pathUrl: string
}

interface ICarState {
    cars: ICar[]
    popularCars: ICar[]
    isLoading: boolean
    status: null | string
}

const initialState: ICarState = {
    cars: [],
    popularCars: [],
    isLoading: false,
    status: null
}

interface IDataCreateCar {
    brand: string,
    model: string,
    engine: string,
    transmission: string
    color: string
    price: number
    img: File | null
}

export const createCar = createAsyncThunk(
    'car/createCar',
    async (params: any) => {
        try {
            const { data } = await axios.post('/car', params)
            return data
        } catch (e) {
            console.log('e',e)
        }
    }
)

export const getAllCars = createAsyncThunk(
    'car/getAllCars',
    async () => {
        try {
            const { data } = await axios.get('/car')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const updateCar = createAsyncThunk(
    'car/updateCars',
    async (updatedCar: any) => {
        try {
            const { data } = await axios.put(`/car/update`, updatedCar)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)


export const removeCar = createAsyncThunk(
    'car/removeCar',
    async (id: any) => {
    try {
        const { data } = await axios.delete(`/car/remove/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {},
    extraReducers: {
        // Create Car
        [createCar.pending.type]: (state) => {
            state.isLoading = true
        },
        [createCar.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.cars.push(action.payload.car)
        },
        [createCar.rejected.type]: (state) => {
            state.isLoading = false
        },
        // Get All Cars
        [getAllCars.pending.type]: (state) => {
            state.isLoading = true
        },
        [getAllCars.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.cars = action.payload.cars
        },
        [getAllCars.rejected.type]: (state) => {
            state.isLoading = false
        },
        // Update Car
        [updateCar.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateCar.fulfilled.type]: (state, action) => {
            console.log('payload ', action.payload)
            state.isLoading = false
            const index = state.cars.findIndex(
                (car) => car._id === action.payload._id,
            )
            state.cars[index] = action.payload
        },
        [updateCar.rejected.type]: (state) => {
            state.isLoading = false
        },
        // Remove Car
        [removeCar.pending.type]: (state) => {
            state.isLoading = true
        },
        [removeCar.fulfilled.type]: (state, action) => {
            console.log('payload ', action.payload)
            state.isLoading = false
            state.cars = state.cars.filter(
                (car) => car._id !== action.payload._id,
            )
        },
        [removeCar.rejected.type]: (state) => {
            state.isLoading = false
        },
    }
})

export default carSlice.reducer
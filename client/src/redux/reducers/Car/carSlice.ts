import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";

export interface ICar {
    brand: string
    model: string
    engine: string
    fuel: string
    type: string
    power: string
    acceleration: string
    drive: string
    color: string[]
    transmission: string
    price: number
    imgUrl: string
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
            console.log('action', action.payload)
            state.cars.push(action.payload)
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
            console.log('cars',action.payload.cars)
            state.cars = action.payload.cars
        },
        [getAllCars.rejected.type]: (state) => {
            state.isLoading = false
        }
    }
})

export default carSlice.reducer
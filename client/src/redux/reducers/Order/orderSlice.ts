import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import { ICar} from "../Car/carSlice";
import {IUser} from "../user/userSlice";
import {TStatusOrder} from "../../../constants/statusOrder";

export const initialCar: ICar = {
    brand: '',
    model: '',
    engine: '',
    transmission: '',
    _id: '',
    count: 0,
    color: '',
    imgUrl: '',
    type: '',
    price: 0,
    pathUrl: '',
    drive: '',
    acceleration: '',
    power: '',
    fuel: ''
}

export const initialUser: IUser = {
    id: '',
    email: '',
    role: 'USER',
    username: '',
    password: ''
}

export interface IOrders {
    car:  ICar
    user: IUser
    status: TStatusOrder
    _id: string
    message: string
    guarantee: Date | ''
}

export interface IOrdersState {
    orders: IOrders[]
    isLoading: boolean
    status: null | string
}

const initialState: IOrdersState = {
    orders: [{
        car: initialCar,
        user: initialUser,
        status: 'PROCESSED',
        _id: '',
        message: '',
        guarantee: '',
    }],
    isLoading: false,
    status: null
}

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (id: string) => {
        try {
            const { data } = await axios.post('/order', {carId: id})
            return data
        } catch (e) {
            console.log('e',e)
        }
    }
)

export const getAllOrders= createAsyncThunk(
    'order/getAllOrder',
    async () => {
        try {
            const { data } = await axios.get('/order/getAllOrders')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async (order: any) => {
        try {
            const { data } = await axios.put('/order/updateOrder', order)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        // Create Order
        [createOrder.pending.type]: (state) => {
            state.isLoading = true
        },
        [createOrder.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.orders.push(action.payload)
        },
        [createOrder.rejected.type]: (state) => {
            state.isLoading = false
        },
        // Get All Orders
        [getAllOrders.pending.type]: (state) => {
            state.isLoading = true
        },
        [getAllOrders.fulfilled.type]: (state, action) => {
            console.log('actpay',action.payload)
            state.isLoading = false
            state.orders = action.payload.orders
        },
        [getAllOrders.rejected.type]: (state) => {
            state.isLoading = false
        },
        // Update Orders
        [updateOrder.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateOrder.fulfilled.type]: (state, action) => {
            console.log('actpay update',action.payload)
            state.isLoading = false
            const index = state.orders.findIndex(
                (order => order._id === action.payload.order._id)
            )
            console.log('index', index)
            state.orders[index].status = action.payload.order.status
            state.orders[index].car = action.payload.order.car
            state.orders[index].guarantee = action.payload.order.guarantee
        },
        [updateOrder.rejected.type]: (state) => {
            state.isLoading = false
        }
    }
})

export default orderSlice.reducer
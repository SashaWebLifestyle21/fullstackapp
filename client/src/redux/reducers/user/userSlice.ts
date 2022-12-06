import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {TRolesUser} from "../../../constants/rolesUser";
import {ICar} from "../Car/carSlice";

export interface IUser {
    id: string
    username: string
    email: string
    password: string
    role: TRolesUser
}
interface UserState {
    currentUser: IUser
    status: null | string
    isLoading: boolean
    token: null | string
}

interface IDataRegister {
    username: string
    email: string
    password: string
    role: TRolesUser
}

interface IDataLogin {
    email: string
    password: string
}

const initialState: UserState = {
    currentUser: {
        id: '',
        username: '',
        email: '',
        password: '',
        role: "USER",
    },
    status: null,
    isLoading: false,
    token: null
}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ username, email, password, role }: IDataRegister, thunkAPI) => {
        try {
            const res = await axios.post('/user/register', {
                username,
                email,
                password,
                role
            })

            if(res.data.token){
                window.localStorage.setItem('userToken', res.data.token)
            }

            return res.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    })

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: IDataLogin, thunkAPI) => {
        try {
            const res = await axios.post('/user/login', {
                email,
                password
            })

            if(res.data.token){
                window.localStorage.setItem('userToken', res.data.token)
            }

            return res.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка')
        }
    })

export const addCarWishlist = createAsyncThunk(
    'user/addCarWishlist',
    async () => {
        try {
            const { data } = await axios.get('car/getWishlist')
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const removeCarWishlist = createAsyncThunk(
    'user/removeCarWishlist',
    async (id: string) => {
        try {
            const {data} = await axios.delete(`/car/removeWishlist/${id}`)
            console.log('rem ', data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const getMe = createAsyncThunk(
    'user/getMeUser',
    async () => {
        try {
            const res = await axios.get('/user/getMe')
            return res.data
        } catch (e) {
            console.log(e)
        }
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = {
                id: '',
                username: '',
                email: '',
                password: '',
                role: "USER",
            }
            state.token = null
            state.isLoading = false
            state.status = null
        },
        // setUser(state, action: PayloadAction<IUser>) {
        //     state.currentUser = action.payload
        //     state.isAuth = true
        // },
        // logout(state) {
        //     localStorage.removeItem('userToken')
        //     state.currentUser = {}
        //     state.isAuth = false
        // }
    },
    extraReducers: {
        // Register user
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        // Login user
        [loginUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        // GetMe user
        [getMe.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.token = action.payload?.token
            state.currentUser = action.payload?.user
        },
        [getMe.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state: UserState) => Boolean(state.token)
export const { logout } = userSlice.actions
export default userSlice.reducer
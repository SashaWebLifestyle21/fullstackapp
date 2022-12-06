import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {TRolesUser} from "../../../constants/rolesUser";

export interface IManager{
    _id: string,
    user: {
        email: string,
        password: string,
        role: TRolesUser
        username: string
        _id: string
    }
    count: number
}

interface IManagerState {
    managers: IManager[]
    isLoading: boolean
}

const initialState: IManagerState = {
    managers: [],
    isLoading: false
}

export const getAllManagers = createAsyncThunk(
    'manager/getManager',
    async () => {
        try {
            const { data } = await axios.get('manager/getAll', )
            return data
        } catch (e) {
            console.log('e',e)
        }
    }
)


export const managerSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        //get all
        [getAllManagers.pending.type]: (state) => {
            state.isLoading = true
        },
        [getAllManagers.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.managers = action.payload.managers
        },
        [getAllManagers.rejected.type]: (state) => {
            state.isLoading = false
        },
    }
})

export default managerSlice.reducer
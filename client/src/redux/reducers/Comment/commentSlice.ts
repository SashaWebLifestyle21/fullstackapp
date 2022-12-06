import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../api/axios/axios";
import {createOrder} from "../Order/orderSlice";

interface ICommentState {
    comments: string[]
    isLoading: boolean
}

const initialState: ICommentState = {
    comments: [],
    isLoading: false
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async (params: any) => {
        try {
            const { data } = await axios.post(`/comment/${params.managerId}`, params)
            return data
        } catch (e) {
            console.log('e',e)
        }
    }
)


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Create Comment
        [createComment.pending.type]: (state) => {
            state.isLoading = true
        },
        [createComment.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected.type]: (state) => {
            state.isLoading = false
        },
    }
})

export default commentSlice.reducer
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchHotBooks= createAsyncThunk('listBook/fetchHotBooks',async (id)=>{
    const res=await axios.get('/home/hot-book', {
        params: {id}
    })
    return res.data
})
export const fetchNewBooks= createAsyncThunk('listBook/fetchNewBooks',async (id)=>{
    const res=await axios.get('/home/new-book', {
        params: {id}
    })
    return res.data
})

const listBookReducer= createSlice({
    name:'listBook',
    initialState:{
        hot:[],
        newBook:[],
    },
    extraReducers:{
        [fetchHotBooks.fulfilled]: (state,action)=>{
            state.hot= action.payload
        },
        [fetchNewBooks.fulfilled]: (state, action)=>{
            state.newBook= action.payload
        }
    }
})

export default listBookReducer.reducer

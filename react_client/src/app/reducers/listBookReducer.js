import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchHotBooks= createAsyncThunk('listBook',async (id)=>{
    const res=await axios.get('/home/hot-book', {
        params: {id}
    })
    return res.data
})

const listBookReducer= createSlice({
    name:'listBook',
    initialState:{
        hot:[],
        select:[],
    },
    extraReducers:{
        [fetchHotBooks.fulfilled]: (state,action)=>{
            state.hot= action.payload
        }
    }
})

export default listBookReducer.reducer

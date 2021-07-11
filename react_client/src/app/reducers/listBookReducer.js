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
        loading: false,
        err: null
    },
    extraReducers:{
        [fetchHotBooks.pending]: state=>{
            state.loading= true
            state.err= null
        },
        [fetchHotBooks.fulfilled]: (state,action)=>{
            state.hot= action.payload
            state.loading= false
            state.err= null
        },
        [fetchHotBooks.rejected]: state=>{
            state.loading= false
            state.err= "Lỗi tải danh sách truyện đang hot"
        },
        [fetchNewBooks.pending]: state=>{
            state.loading= true
            state.err= null
        },
        [fetchNewBooks.fulfilled]: (state, action)=>{
            state.newBook= action.payload
            state.loading= false
            state.err= null
        },
        [fetchNewBooks.rejected]: state=>{
            state.loading= false
            state.err= 'Lỗi tải danh sách truyện mới cập nhật'
        }
    }
})

export default listBookReducer.reducer

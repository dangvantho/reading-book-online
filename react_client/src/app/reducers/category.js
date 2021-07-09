import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchCategory= createAsyncThunk('category', async ()=>{
    try {
        const res=await axios.get('/home/category')
    return res.data
    } catch (error) {
        throw new Error(error)
    }
})

const categorySlice= createSlice({
    name:'category',
    initialState: {
        loading: false,
        data: [],
        err: null
    },
    extraReducers:{
        [fetchCategory.pending]: (state, action)=>{
            state.loading= true
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.data= action.payload.map(value=>{
                const url= value.url.split('/')
                value.href= url[url.length-2]
                return value
            })
            state.loading= false
        },
        [fetchCategory.rejected]: (state, action)=>{
            state.loading= false
            state.err= action.payload
        }
    },
})

export default categorySlice.reducer
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
    initialState: [],
    extraReducers:{
        [fetchCategory.pending]: (state, action)=>{
            console.log(state, action)
        },
        [fetchCategory.fulfilled]: (state, action) => {
            return action.payload.map(value=>{
                const url= value.url.split('/')
                value.href= url[url.length-2]
                return value
            })
        },
        [fetchCategory.rejected]: (state, action)=>{
            console.log(action)
        }
    },
})

export default categorySlice.reducer
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchGenreBooks= createAsyncThunk('genre/fetchGenreBooks', async({ genre, page})=>{
    const res= await axios.get('/genre', {
        params: {
            genre,
            page
        }
    })
    console.log(res.data, res)
    return res.data
})

const genreSlice= createSlice({
    name:'genre',
    initialState: {
        title: null,
        desc: null,
        maxPage: null,
        data: [],
        loading: false,
        err: null,
    },
    extraReducers:{
        [fetchGenreBooks.pending]: state=>{
            state.loading= true
            state.err= null
        },
        [fetchGenreBooks.fulfilled]: (state, action)=>{
            return { ...state, ...action.payload, loading: false}
        },
        [fetchGenreBooks.rejected]: (state, action)=>{
            state.loading= false
            state.err= action.payload
        }
    },
})

export default genreSlice.reducer
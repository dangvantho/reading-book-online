import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchGenreBooks= createAsyncThunk('genre/fetchGenreBooks', async({ genre, page})=>{
    const res= await axios.get('/genre', {
        params: {
            genre,
            page
        }
    })
    return res.data
})

const genreSlice= createSlice({
    name:'genre',
    initialState: {
        title: null,
        desc: null,
        data: [],
    },
    extraReducers:{
        [fetchGenreBooks.fulfilled]: (state, action)=>action.payload
    },
})

export default genreSlice.reducer
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchInforOfBook= createAsyncThunk('book/fetchInforOfBook', async url=>{
    const res= await axios.get(`/book/${url}`)
    return res.data
})
export const fetchPage= createAsyncThunk('book/fetchBook', async ({url, page})=>{
    const res= await axios.get(`/book/list-chapter/${url}`,{
        params: { page }
    })
    console.log(url, page, res.data)
    return res.data
})
const bookSLice= createSlice({
    name:'book',
    initialState:{
        maxPage: null,
        currentPage: null,
        content: [],
        title: null,
        currentChapter: null,
        url:null,
        links:[],
    },
    extraReducers:{
        [fetchInforOfBook.fulfilled]: (state, action)=>{
            const {maxPage, links, title } = action.payload
            return {...state, maxPage, links, title}
        },
        [fetchPage.fulfilled]: (state, action)=>{
            const links= action.payload
            state.links= links
        }
    },
})

export default bookSLice.reducer
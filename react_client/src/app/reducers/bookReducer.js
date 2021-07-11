import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchInforOfBook= createAsyncThunk('book/fetchInforOfBook', async url=>{
    const res= await axios.get(`/book/${url}`)
    return res.data
})
export const fetchPage= createAsyncThunk('book/fetchPage', async ({link, page})=>{
    console.log(link, page)
    const res= await axios.get(`/book/list-chapter/${link}`,{
        params: { page }
    })
    console.log(link, page, res.data)
    return res.data.data
})
export const fetchContent= async url=>{
    const link= url.split('/')
    const length= link.length
    console.log(link[length-3], link[length-2], console.log(url))
    const res= await axios.get(`/book/content-chapter/${link[length-3]}/${link[length-2]}`)
    console.log(res)
    return res.data
}
const bookSLice= createSlice({
    name:'book',
    initialState:{
        maxPage: null,
        content: [],
        desc: null,
        info: {
            author: {},
            img: null,
            genre: [],
            title: null,
        },
        links:[],
        loading: false,
        err: null
    },
    extraReducers:{
        [fetchInforOfBook.pending]: state=>{
            state.loading= true
            state.err= null
        },
        [fetchInforOfBook.fulfilled]: (state, action)=>{
            const {maxPage, links, desc, info, title } = action.payload
            return {...state, maxPage, links, desc, info, title, loading: false}
        },
        [fetchInforOfBook.rejected]: (state, action)=>{
            state.loading= false
            state.err= action.payload
        },
        [fetchPage.pending]: state=>{
            state.loading= true
            state.err= null
        },
        [fetchPage.fulfilled]: (state, action)=>{
            const links= action.payload
            state.links= links
            state.loading= false
        },
        [fetchPage.rejected]: (state, action)=>{
            state.loading= false
            state.err= action.payload
        },
    },
})

export default bookSLice.reducer
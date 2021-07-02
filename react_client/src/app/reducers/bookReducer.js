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
    return res.data
})
export const fetchContent= createAsyncThunk('book/fetchContent', async url=>{
    const link= url.split('/')
    const length= link.length
    console.log(link[length-3], link[length-2], console.log(url))
    const res= await axios.get(`/book/content-chapter/${link[length-3]}/${link[length-2]}`)
    console.log(res)
    return res.data
})
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

        },
        links:[],
    },
    extraReducers:{
        [fetchInforOfBook.fulfilled]: (state, action)=>{
            const {maxPage, links, desc, info } = action.payload
            return {...state, maxPage, links, desc, info}
        },
        [fetchPage.fulfilled]: (state, action)=>{
            const links= action.payload
            state.links= links
        },
        [fetchContent.fulfilled]:(state, action)=>{
            state.content= action.payload.split('.').filter(value=>value!='')
        }
    },
})

export default bookSLice.reducer
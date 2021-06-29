import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch,connect } from 'react-redux';
import {fetchHotBooks} from '../../app/reducers/listBookReducer'

const useStyle= makeStyles(theme=>({
    root:{}
}))

function HotBook(props) {
    const {books, categories}= props
    const classes= useStyle()
    const dispatch= useDispatch()
    const [id, setId]= useState('all')
    function handleSelect(e){
        let id= e.target.value
        setId(id)
        dispatch(fetchHotBooks(id))
    }
    useEffect(()=>{
        if(books.length===0){
            dispatch(fetchHotBooks('all'))
            console.log('tesst')
        }
    }, [])
    return (
        <div>
            <Box display='flex' justifyContent='space-between'>
                <h3 className={classes.title}>Truyện hot</h3>
                <select value={id} onChange={handleSelect}>
                    <option value="all">Tất cả</option>
                    {categories.map((value, index)=>(
                        <option value={index+1} key={value.title}>
                            {value.title}
                        </option>
                    ))}
                </select>
            </Box>
            <Box>
                {books.map(value=>(
                    <Box>
                        <img src={value.img} alt={value.title}/>

                    </Box>
                ))}
            </Box>
        </div>
    );
}
const mapSateToProps= state=>({
    books: state.listBook.hot,
    categories: state.category
})
export default connect(mapSateToProps, null)(HotBook)
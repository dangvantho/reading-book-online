import React, { useEffect, useState } from 'react';
import {connect, useDispatch} from 'react-redux'
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {fetchCategory} from '../../app/reducers/category'

Genre.propTypes = {
    
};

function Genre(props) {
    const {categories}= props
    const {category}= useParams()
    const dispatch= useDispatch()
    const [title, setTitle]= useState('')
    useEffect(()=>{
        if(categories.length===0){
            dispatch(fetchCategory())
        }else{
            let tam= categories.find(value=>value.href===category).title
            setTitle(tam)
        }
    },[categories, category])
    return (
        <div>
            {title}
        </div>
    );
}
const mapSateToProps= state=>({
    categories: state.category
})
export default connect(mapSateToProps, null)(Genre)
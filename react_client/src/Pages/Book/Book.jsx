import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux'
import {fetchInforOfBook, fetchPage} from '../../app/reducers/bookReducer'
import {Pagination} from '@material-ui/lab'
Book.propTypes = {
    
};

function Book(props) {
    const { title, maxPage, content, links}= props.book
    const {name}= useParams()
    const dispatch= useDispatch()
    function handleChangePage(e, page){
        dispatch(fetchPage({
            url: name,
            page
        }))
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
    useEffect(()=>{
        dispatch(fetchInforOfBook(name))
    }, [name])
    return (
        <div>
            <div>{title}</div>
            {links.map(value=>(
                <p key={value.title}>
                    {value.title}
                </p>
            ))}
            <Pagination count={maxPage} onChange={handleChangePage} />
        </div>
    );
}

const mapStateToProps= state=>({
    book: state.book
})

export default connect(mapStateToProps, null)(Book)
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../api/api'

function TestCrawlData(props) {
    const [data, setData]= useState([])
    useEffect(()=>{
        axios.get('/home')
        .then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=> {
            throw new Error
        })
    }, [])
    return (
        <ul>
           {data.map(value=>(
               <li key={value.url}>
                   <a href={value.url}>
                       <img src={value.img} className="testImg" lazysrc={value.img} alt={value.title}/>
                       <div>{value.title}</div>
                   </a>
               </li>
           ))}
        </ul>
    );
}
export default TestCrawlData;
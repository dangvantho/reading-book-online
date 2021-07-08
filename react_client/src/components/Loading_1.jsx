import React from 'react';
import { makeStyles } from '@material-ui/core'

const useStyle= makeStyles(theme=>({
    root:{
        width: '100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    load:{
        width: 6,
        height: 20,
        marginRight: 4,
        '&:nth-child(1)':{
            background:'#fea224',
            animation:'loading_1 0.9s infinite linear',
            animationDelay:'0s',
        },
        '&:nth-child(2)':{
            background:'#ffce37',
            animation:'loading_1 0.9s infinite linear',
            animationDelay:'0.3s',
        },
        '&:nth-child(3)':{
            background:'#fff06b',
            animation:'loading_1 0.9s infinite linear',
            animationDelay:'0.6s',
        },
    }
}))

function Loading_1(props) {
    const classes= useStyle()
    return (
        <div className={classes.root}>
            <span className={classes.load}></span>
            <span className={classes.load}></span>
            <span className={classes.load}></span>
        </div>
    );
}

export default Loading_1;
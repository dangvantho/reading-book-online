import React from 'react';
import { Box, makeStyles, } from '@material-ui/core'

const useStyle= makeStyles(theme=>({
    root:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'column',
        height:'100%',
    },
    loading:{
        display:'block',
        position:'relative',
        width: '60%',
        height: 8,
        marginLeft: 16,
        borderRadius: 5,
        background:'#f1ecec',
        overflow:'hidden',
        '&:nth-child(1)':{
            marginLeft: 0,
        },
        "&::after":{
            content:'""',
            position:'absolute',
            left: 0,
            top: 0,
            bottom:0,
            width: '40%',
            borderRadius: 5,
            animation:'$effect 0.6s linear infinite',
            background:'#e7e7e7'
        },
    },
    '@keyframes effect':{
        '0%':{
            left: 0,
        },
        '100%':{
            left: '100%',
        },
    },
}))

function ContentLoading(props) {
    const classes= useStyle()
    return (
        <Box className={classes.root} {...props}>
            <span className={classes.loading}></span>
            <span className={classes.loading}></span>
            <span className={classes.loading}></span>
        </Box>
    );
}

export default ContentLoading;
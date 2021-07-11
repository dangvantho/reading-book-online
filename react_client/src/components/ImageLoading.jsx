import React from 'react';
import images from '../assets/images.png'
import { makeStyles, Box} from '@material-ui/core'

const useStyle= makeStyles(theme=>({
    root:{
        display:'inline-block',
        overflow:'hidden',
        position:'relative',
    },
    img:{
        // width: '100%',
        height: '100%',
        maxHeight: 54,
        objectFit:'contain',
    },
    loading:{
        position:'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '40%',
        animation: '$effect 0.8s ease-in infinite',
        background:'#fff',
        opacity: 0.3
    },
    '@keyframes effect':{
        '0%':{
            left: 0,
        },
        '100%':{
            left: '100%',
        }
    },
}))

function ImageLoading(props) {
    const classes= useStyle()
    return (
        <Box className={classes.root} {...props}>
            <img src={images} alt="Truyện full" className={classes.img}/>
            <div className={classes.loading}></div>
        </Box>
    );
}

export default ImageLoading;
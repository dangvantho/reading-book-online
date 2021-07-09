import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core'

// Circular.propTypes = {
//     value: PropTypes.number.isRequired,
// };

function Circular(props) {
    const [process, setProcess]= useState(10)
    const [loading, setLoading]= useState(false)
    useEffect(()=>{
        if(!loading) setLoading(true)
        const interval= setInterval(()=>{
            setProcess(pre=>pre+10)
        },600)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    useEffect(()=>{
        if(process>100){
            setLoading(false)
        
        }
    }, [process])
    return (
        <React.Fragment>
            { loading && (
                <Box 
                position='fixed'
                top={0} bottom={0}
                left={0} right={0} 
                display='flex'
                alignItems='center'
                justifyContent='center'
                bgcolor='#fff'
               >
                   <CircularProgress variant='determinate' value={process} size={60}/>
                   <Box>
                   </Box>
               </Box>
            )}
            {!loading && props.children}
        </React.Fragment>
    );
}

export default Circular;
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Wrapper from '../../layouts/Wrapper';
import HotBook from './HotBook';
import NewBox from './NewBox';

const useStyle= makeStyles(theme=>({
    root:{},
}))

function Home(props) {
    return (
        <Wrapper bgcolor='#f4f4f4'>
            <HotBook/>
            <NewBox/>
        </Wrapper>
    );
}

export default Home;
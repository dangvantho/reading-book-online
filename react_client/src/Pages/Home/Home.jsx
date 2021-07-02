import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Wrapper from '../../layouts/Wrapper';
import HotBook from './HotBook';
import NewBox from './NewBox';
import bg from "../../assets/bg.jpg";

const useStyle= makeStyles(theme=>({
    root:{},
}))

function Home(props) {
    return (
        <Wrapper body={true} bgcolor={`url(${bg}) top center repeat-x #F4F4F4`}>
            <HotBook/>
            <NewBox/>
        </Wrapper>
    );
}

export default Home;
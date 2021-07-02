import { Box } from '@material-ui/core';
import React from 'react';
import Wrapper from './Wrapper'

function HedderBottom(props) {
    return (
        <Wrapper bgcolor='#ececec'>
            <Box 
            textOverflow='ellipsis' 
            overflow='hidden'
            whiteSpace='nowrap'
            lineHeight='30px'
            padding='0 8px 0 16px'
            color='#4e4e4e'
            fontFamily="'Roboto Condensed',Tahoma,sans-serif"
            >
               Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục.
            </Box>
        </Wrapper>
    );
}

export default HedderBottom;
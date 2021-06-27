import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

TestSpeechText.propTypes = {
    
};

function TestSpeechText(props) {
    const [value, setValue]= useState('')
    async function speechText(text='', speech= 1){
        await axios.post('https://texttospeechapi.wideo.co/api/wideo-text-to-speech',{
            data: { text, speech, voice: "vi-VN-Standard-A"}
        }).then(async res=>{
            console.log(res.data.result.url)
            let au= new Audio(res.data.result.url)
            await au.play()
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        speechText(value)
        e.target.reset()
    }
    function handleChangeInput(e){
        setValue(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChangeInput}/>
            </form>
        </div>
    );
}

export default TestSpeechText;
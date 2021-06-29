import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

TestSpeechText.propTypes = {
    
};

function TestSpeechText(props) {
    const [value, setValue]= useState('')
    const [voices, setVoices]= useState({
        current: null,
        data: [],
    })
    const [text, setText]= useState([])
    function speechText(text='', speech= 1){
        return axios.post('https://texttospeechapi.wideo.co/api/wideo-text-to-speech',{
            data: { text, speech, voice: "vi-VN-Standard-A"}
        }).then(async res=>{
            console.log(res.data.result.url)
            return res.data.result.url
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        const currentText= [...text]
        currentText.push(value)
        setText(currentText)
        console.log(currentText)
        e.target.reset()
    }
    function handleChangeInput(e){
        setValue(e.target.value)
    }
    async function handleReading(){
        let currentVoice= 0
        let values=await Promise.allSettled(text.map(value=>speechText(value)))
        let length= values.length
        let src=values[currentVoice].value
        let au= new Audio(src)
        au.play()
        au.onended= function(){
            if(currentVoice.length<currentVoice+1) return
            currentVoice++
            au.src= values[currentVoice].value || null
            au.play()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChangeInput}/>
            </form>
            <ul>
                {text.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <button onClick={handleReading}>Đọc đoạn văn</button>
        </div>
    );
}

export default TestSpeechText;
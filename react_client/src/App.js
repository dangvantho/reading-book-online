import React from "react";
import Router from "./Router";
import HedderBottom from "./layouts/HedderBottom";
import Test from './components/TestSpeechText'
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer'
import {BrowserRouter , Route, Switch, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <HedderBottom/>
      <Router/>
      {/* <Test/> */}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import Router from "./Router";
import Test from './components/TestSpeechText'
import Header from './layouts/Header/Header';
import {BrowserRouter , Route, Switch, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Router/>
      {/* <Test/> */}
    </BrowserRouter>
  );
}

export default App;

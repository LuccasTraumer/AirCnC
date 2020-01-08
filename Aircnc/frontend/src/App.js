// Externas
import React from 'react';
import { Link }from 'react-router-dom'

//Internas
import './App.css';
import logo from './assets/logo.svg';

import Routes from './routes';

//

function App() {

  return (
    <div className="container">
      <img src={logo} alt="logoAc"/>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;

//Externas
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import React from 'react';
// Internas
import Login from './pages/Login';
import Dashbord from './pages/Dashbord';
import New from './pages/New';





export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashbord}/>
                <Route path="/new" component={New}/>
            </Switch>
        </BrowserRouter>
    );
}
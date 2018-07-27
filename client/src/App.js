import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Monitor from './pages/Monitor';
import Camera from './pages/Camera';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path = "/register" component = { Register }/>
            <Route exact path = "/" component = { Login }/>
            <Route exact path = "/monitor" component = {Monitor}/>
            <Route exact path = "/camera" component = {Camera}/>
      </div>
      </Router>
    );
  }
}


export default (App);


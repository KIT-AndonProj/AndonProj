import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Route exact path = "/register" component = { Register }/>
            <Route exact path = "/login" component = { Login }/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

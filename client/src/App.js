import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RepoInfo from './components/auth/RepoInfo'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Route exact path = "/register" component = { Register }/>
            <Route exact path = "/login" component = { Login }/>
            <Route exact path = "/repoinfo" component = { RepoInfo }/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

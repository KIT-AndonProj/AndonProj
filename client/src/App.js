import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Monitor from './pages/Monitor';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path = "/register" component = { Register }/>
            <Route exact path = "/" component = { Login }/>
            <Route exact path = "/monitor" component = {Monitor}/>
      </div>
      </Router>
    );
  }
}


export default (App);


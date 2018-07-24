import React, { Component } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

class AuthenticationPage extends Component {

    isAuthenticated(){
        const token = sessionStorage.getItem('token');
        return token && token.length > 10;
    }
    render(){
        if( !this.isAuthenticated() ){
        return(
            
                <div></div>
            );
        }
        else {
            
        }
    }
}

export default AuthenticationPage;
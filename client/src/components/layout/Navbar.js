import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render(){
        return (
            <nav className="navbar">
                HIIIIII
                <Link className="nav-link" to="/login">
                    Login
                </Link>
                <Link className="nav-link" to="/register">
                    Sign up
                </Link>
            </nav>
        )
    }
}

export default Navbar
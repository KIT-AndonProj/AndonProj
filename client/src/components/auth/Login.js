import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/login.css';
import swal from 'sweetalert2'
// import { addCookie } from '../../actions/cookieActions';
// import { connect } from 'react-redux'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirect: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(user);

    }

    render() {

        if(sessionStorage.getItem("user")){
            return (<redirect to={'/monitor'}/>)
        }
        return (
            <div className="parallax">
            <div id="login-div">
                <form onSubmit={this.onSubmit}>
                {/* <label>Username</label> */}
                    <input  type="text" name="username" required   autoComplete="off" placeholder="Username" onChange={this.onChange}/>
                {/* <label>Password</label> */}
                    <input  type="password" placeholder="Password" required autoComplete="off"  name="password" value={this.state.password} onChange={this.onChange}></input>
                    <input id="submitBtn" type="submit"/>
                </form>
                </div>
            </div>
        )
    }
}


export default (Login);
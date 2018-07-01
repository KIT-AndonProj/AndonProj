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

        axios.post('http://localhost:5000/api/user/login', user)
        .then(
            (res) => {
            console.log(res.data)
            swal({
                title: "Success",
                text: "Login successful",
                type: "success",
                confirmButtonText: "OK"
            })
            .then((res) => {
                this.props.history.push("/monitor");
            })
        })
        .catch((res) => {
            swal({
                title: "Error",
                text: "Wrong username or password",
                type: "error",
                confirmButtonText: "Try again"
            });
        });
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
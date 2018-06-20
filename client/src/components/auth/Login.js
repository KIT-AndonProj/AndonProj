import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errors: {}
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

        axios.post('/api/user/login', user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange}></input>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}></input>
                    <input type="submit"/>
                </form>
               
            </div>
        )
    }
}

export default Login
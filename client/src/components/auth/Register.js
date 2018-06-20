import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password2: '',
            gitURL: '',
            imgURL: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            gitURL: this.state.gitURL,
            imgURL: this.state.imgURL
        }
       
        axios.post('/api/user/register', newUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div>
                Register
                <form onSubmit = {this.onSubmit}>
                    <input type="text" placeholder="Username" name="username" value={this.state.username} required onChange={this.onChange}></input>
                    <input type="text" placeholder="Git URL" name="gitURL" value={this.state.gitURL} required onChange={this.onChange}></input>
                    <input type="text" placeholder="Image URL" name="imgURL" value={this.state.imgURL} required onChange={this.onChange}></input>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} required onChange={this.onChange}></input>
                    <input type="password" placeholder="Comfirm Password" name="password2" value={this.state.password2} required onChange={this.onChange}></input>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Register
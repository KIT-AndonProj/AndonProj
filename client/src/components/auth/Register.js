import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import '../../stylesheets/register.css';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password2: '',
            gitName: '',
            errors: {},
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)      
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    alertDialog(title,text,type){
        swal({
            title: title,
            text: text,
            type: type,
            heightAuto: false
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            gitName: this.state.gitName,
        }
        swal({
            title: 'Creating your account',
            text: 'Creating...',
            allowOutsideClick: false,
            heightAuto: false,
            onOpen: ()=> {
                swal.showLoading();
        axios.post('/api/user/register', newUser)
            .then(
                (res) => {
                    if( res.data.username === 'This username already exists'){
                        this.alertDialog("Username already exists","Please choose other name","error");
                    }
                    else if( res.data.gitName === 'Github username not found' || res.data.gitName === 'This github username already exists'){
                        this.alertDialog("GitHub Username Already registered or Not found!","Please enter valid or non-register GitHub username","error")
                    }
                    else if( res.data.password2 === 'Password not match'){
                        this.alertDialog("Password not match!","Please enter password again","error");
                    }
                    else if( res.data === 'Github API rate limit exceeded' ){
                        this.alertDialog("Can not register","GitHub API rate limit exceeded","error")
                    }
                    
                    else {
                        this.alertDialog("User created","Please login","success")
                        this.props.history.push("/");
                    }
                })
            .catch( (err) => {   
                this.alertDialog("Error","Incorrect Information","error")
            })
        }})
    }
        
    render() {
        return (
            <div className="background">
                    <div className="container-fluid">
                        <div className="div-center animated bounceInDown delay-2s">
                            <div className="content">
                            <div className="row">
                            <div className="text-center">
                            <div className="typewriter">
                                        <h1 className="animated bounceInDown delay-2s"id="header">SIGN UP</h1>
                                    </div>
                                <form className="regis-form" onSubmit = {this.onSubmit}>
                                <div className="form-group">
                                <h2 id="label">USERNAME</h2>
                                <input className="form-control" type="text" minLength="6" autoComplete="off" placeholder="6 characters minimum" name="username" value={this.state.username} required onChange={this.onChange}></input>
                                <h2 id="label">GITHUB USERNAME  <strong>*ONLY USERNAME*</strong></h2>
                                <input className="form-control"type="text" autoComplete="off" placeholder="Github username" name="gitName" value={this.state.gitName} required onChange={this.onChange}></input>
                                <h2 id="label">PASSWORD</h2>
                                <input className="form-control" type="password"  minLength="6" autoComplete="off" placeholder="6 characters minimum" name="password" value={this.state.password} required onChange={this.onChange}></input>
                                <h2 id="label">CONFIRM PASSWORD</h2>
                                <input className="form-control" type="password"  minLength="6" autoComplete="off" placeholder="6 characters minimum" name="password2" value={this.state.password2} required onChange={this.onChange}></input>
                                <input className="form-control btn btn-outline-info" type="submit"/>
                                </div>
                            </form>
                        </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
                
        )
    }
}

export default Register
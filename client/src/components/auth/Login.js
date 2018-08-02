import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/login.css';
import swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'
import addCookie from '../../actions/addCookie';
import { connect } from 'react-redux'; 
import addCurrentRepo from '../../actions/addCurrentRepo';
import addStatus from '../../actions/addStatus';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirect_status: true,
            profile: [],
            commit_data: [],
            git_status: true,
            isLoggedIn: '',
            user_detect: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.clearPreviousLoggedIn = this.clearPreviousLoggedIn.bind(this)
        this.openCamera = this.openCamera.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    isAuthenticated(){
        const token = sessionStorage.getItem('token');
        return token && token.length > 10;
    }

    onSubmit(e) {
        e.preventDefault();
        swal({
            title: 'Logging in',
            text: 'Verifying...',
            allowOutsideClick: false,
            heightAuto: false,
            onOpen: ()=> {
                swal.showLoading();
                axios.post('/api/user/login',{
                    username: this.state.username,
                    password: this.state.password,
                })
                .then(
                (res) => {
                    if(res.data.username !== 'The service is unavailable'){
                        this.setState({ isLoggedIn: 'true'})
                        this.props.update_status(false);
                        sessionStorage.setItem('token', res.data.token);
                        this.getCurrentRepo(res.data.payload.username,res.data.payload.gitName);
                    }
                    else {
                        this.setState({ isLoggedIn: 'false'})
                    }
                })
                .then((res)=>{
                    if(this.state.isLoggedIn === 'false'){
                        swal({
                            title: "The service is unavailable",
                            text: "Please logout on previous user",
                            type: "error",
                            confirmButtonText: "Try again",
                            heightAuto: false
                        });
                    }
                }).catch((res) => {
                    swal({
                        title: "Error",
                        text: "Wrong username or password",
                        type: "error",
                        confirmButtonText: "Try again",
                        heightAuto: false
                    });
                });
            }
        })
    }

    getCurrentRepo(username,gitName){
        axios({
            url: '/api/git/currrepo',
            method: 'post',
            data: {
                username: gitName,
            },
            headers: {
                Authorization: sessionStorage.token
            }
        }).then(res => {
            if ( res.data !== 'Github API rate limit exceeded'){
                swal({
                    title: "You are logged in",
                    text: "Login successful",
                    type: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    heightAuto: false
                })
                axios({
                    url: '/api/git/repoinfo',
                    method: 'post',
                    data: {
                        username: gitName,
                        repository: res.data
                    },
                    headers: {
                        Authorization: sessionStorage.token
                    }
                }).then(res => {
                    this.getCurrentCommit(gitName,res.data.reponame,res.data);
                    this.props.cookie(username,gitName,res.data.image_url);
                    }
                )
            }
            else {
                sessionStorage.removeItem('token')
                swal({
                    title: 'GitHub API rate limit exceeded',
                    text: 'Please try again later',
                    type: 'error',
                    heightAuto: false
                })
            }
        });  
    }

    getCurrentCommit(gitName,repoName,profile){
        axios({
                url: '/api/git/commits',
                method: 'post',
                data: {
                    username: gitName,
                    repository: repoName
                },
                headers: {
                    Authorization: sessionStorage.token
                }
        }).then(res => {
            if(res.data === 'Information Not found' || res.data === 'Github API rate limit exceeded'){
                this.setState({ redirect_status: false})
            }
            else {
                this.setState({
                commit_data: res.data
            })
            if( res.data!== [])
                this.props.current_repo(profile,res.data)
            }
        })
    }

    openCamera(){
        swal({
            title: 'Connecting Camera',
            text: 'Connecting...',
            allowOutsideClick: false,
            heightAuto: false,
            onOpen: ()=> {
                swal.showLoading();
                axios.get('/api/user/openCam')
                .then((res) => {
                    var usertemp =''
                    if(res.data==='The service is unavailable'){
                        swal({
                            title: 'The service is unavailable',
                            text: 'Please logout from previous user',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 3000,
                            allowOutsideClick: true,
                            heightAuto: false,
                        })
                    }
                    else if ( res.data ==='User not found'){
                        swal({
                            title: 'User Not found',
                            heightAuto: false,
                        })
                    }
                    else {
                        usertemp = res.data.payload.username;
                        sessionStorage.setItem('camToken', res.data.token);
                        swal({
                            title: 'Camera detected!',
                            text: 'Hello '+usertemp + '!',
                            type: 'info',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, this is me!',
                            cancelButtonText: 'No, detect again!',
                            allowOutsideClick: true,
                            heightAuto: false,
                        }
                        ).then((result) => {
                            if ( result.value){
                                axios({
                                    url: '/api/user/updateDB',
                                    method: 'post',
                                    data: {
                                        username: usertemp
                                    },
                                    headers: {
                                        Authorization: sessionStorage.camToken
                                    }
                                }).then(()=>{
                                swal({
                                    title: 'Connected!',
                                    text: 'Please login with your username and password',
                                    type: 'success',
                                    heightAuto: false,
                                }
                                    )
                                    sessionStorage.removeItem('camToken')
                                })
                            }
                            else if (result.dismiss === swal.DismissReason.cancel){
                                sessionStorage.removeItem('camToken')
                                this.openCamera();
                            }
                        })
                    }
                })
            }
        })
    }

    clearPreviousLoggedIn(){
        swal.mixin({
            input: 'password',
            confirmButtonText: 'Submit',
            inputPlaceholder: 'Enter your password',
            heightAuto: false,
          }).queue([
            {
              title: 'Clear Previous login!',
              text: 'Please fill in password to clear previous logged in status '
            },
          ]).then((result) => {
              if( result.value !== "" && result.dismiss !== 'overlay'){
                axios.post('/api/user/clearDB',{ password: result.value[0]}).then( res => {
                    if(res.data !== 'Password incorrect'){
                        swal({
                            title: 'All done!',
                            text: 'Previous logged in status is cleared',
                            type: 'success',
                            confirmButtonText: 'Lovely!',
                            heightAuto: false,
                        })
                    }
                    else {
                        swal({
                            title: 'Password Incorect!',
                            text: 'Only admin password is allowed',
                            type: 'error',
                            confirmButtonText: 'Try Again',
                            heightAuto: false,
                        })
                    }
                })
            }
            else {
                swal({
                    title: 'Password Required',
                    type: 'error',
                    confirmButtonText: 'Try Again',
                    heightAuto: false,
                })
            }
        })
    }

    render() {
        const isAlreadyAuthenticated = this.isAuthenticated();
        if( isAlreadyAuthenticated && this.state.redirect_status ){
        return (
            <Redirect to={{ pathname: '/monitor'}}  /> 
            )
        }
        else {
            return (
                <div className="background">
                    <div className="container-fluid">
                        <div className="div-center animated bounceInDown delay-2s">
                            <div className="content">
                            <div className="row">
                                <div className="text-center">
                                    <div className="typewriter">
                                        <h1 className="animated bounceInDown delay-2s" id="header">ANDON MONITOR</h1>
                                    </div>
                                    <form className="login-form" onSubmit={this.onSubmit}>
                                        <div className="form-group" >
                                            <input className="form-control" type="text" name="username" required   autoComplete="off" placeholder="Username" onChange={this.onChange}/>
                                            <input className="form-control" type="password" placeholder="Password" required autoComplete="off"  name="password" value={this.state.password} onChange={this.onChange}></input>
                                            <input className="form-control btn btn-outline-info" type="submit" value="Login"/>
                                        </div>
                                    </form>
                                    <a href="/register">Not a member? </a>
                                <div className="button-div">
                                    <button id="button-div"className="btn btn-outline-primary animated flash " onClick={this.openCamera} >Open Camera</button>
                                    <button id="button-div"className="btn btn-outline-danger animated flash " onClick={this.clearPreviousLoggedIn }>Clear user status</button>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>            
            )
        }
    }
}

function mapDispatchToProps(dispatch){
    return {
       cookie: (username,gitName, imgURL) => dispatch(addCookie(username,gitName,imgURL)),
       current_repo: (profile,commit_data) => dispatch(addCurrentRepo(profile,commit_data)),
       update_status: (status) => dispatch(addStatus(status))
    }
}

export default connect(null,mapDispatchToProps)(Login);
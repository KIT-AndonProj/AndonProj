import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import '../stylesheets/search.css';
import '../stylesheets/sidebar.css';
import '../stylesheets/dataCard.css';
import logo from '../res/andon.png';
import addDuplicate from '../actions/addDuplicate'
import addBugspot from '../actions/addBugspot'
import addComplexity from '../actions/addComplexity'
import addFrequencyCommit from '../actions/addFrequencyCommit';
import "react-sweet-progress/lib/style.css";
import addOutdated from '../actions/addOutdated';
import addStatus from '../actions/addStatus';
import addScore from '../actions/addScore';
import WatchCard from '../components/WatchCard';
import addWatchRepo from '../actions/addWatchrepo';
import UnwatchCard from '../components/UnwatchCard';

class Monitor extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            disabled: false,
            text: 'Watch',
            repo_url: '',
            imgURL: '../../image-url/'+this.props.profile_img,
            username: '',
            profile: '',
            commit_data: [],
            current_profile: [],
            watch_status: false,
            overall_score: 0,
            img_url : ''
        }
        this.props.update_bugspot('','Loading...');
        this.props.update_complexity('','Loading...');
        this.props.update_duplicate('','Loading...');
        this.props.update_frequency('',0,'Loading...');
        this.props.update_outdated('','Loading...');
    }

    isAuthenticated(){
        const token = sessionStorage.getItem('token');
        return token && token.length > 10;
    }

    updateOverallScore(res){
        this.setState({
            overall_score: this.state.overall_score + parseInt(res.data.overallHealth, 10)
        })
        this.props.update_score(this.state.overall_score);
    }

    updateBugspotFunction(){
        axios({
            url: 'api/analyze/bugspot',
            method: 'get',
            headers: {
                Authorization: sessionStorage.token
                }
        })
        .then((res) => {
            if(res.data.message !== 'Not found commits matching search criteria'){
            this.props.update_bugspot(res.data,'available')
        }
        else {
            this.props.update_bugspot(res.data,'unavailable');
        }
        this.updateOverallScore(res);  
    })
    .catch((res) => {
        console.log("catch",res);
    })
    }

    updateComplexityFunction(){
        axios({
            url: 'api/analyze/complexity',
            method: 'get',
            headers: {
                Authorization: sessionStorage.token
            }
        }).then((res)=>{
            if(res.data.resObj.length !== 0){
                this.props.update_complexity(res.data,'available');
            }
            else {
                this.props.update_complexity(res.data,'unavailable');
            }
            this.updateOverallScore(res);
        })
        .catch(res=>{
            console.log("catch complexity : ",res)
        })  
              
    }

    cloneRepoFunction(){
        swal({
            title: 'Cloning Repository',
            text: 'Cloning...',
            allowOutsideClick: false,
            onOpen: ()=> {
                swal.showLoading();
                axios({
                    url: '/api/git/clonerepo',
                    method: 'post',
                    data: {
                        username: this.state.username,
                        repository: this.state.repo_url
                    },
                    headers: {
                      Authorization: sessionStorage.token
                  }
                }).then((res) => {
                    this.updateBugspotFunction();
                    this.updateComplexityFunction();
                    this.updateDuplicateFunction();
                    this.updateOutdatedFunction();
                    if(res.data === 'Finish'){
                        swal.close();
                    }
                  })
            }
        })
    }

    updateDuplicateFunction(){
        axios({
            url: 'api/analyze/duplicate',
            method: 'get',
            headers: {
                Authorization: sessionStorage.token
            }
        }).then((res) => {
            if(res.data.message === 'The jscpd found too many duplicates over threshold'){
                this.props.update_duplicate(res.data,'Too many duplication');
            }
            else{
                this.props.update_duplicate(res.data,'available')
            }
            this.updateOverallScore(res);
        })
        .catch((res) => {
            console.log("catch duplicate",res)
        })
        
    }

    updateOutdatedFunction(){
        axios({
            url: 'api/analyze/outdated',
            method: 'get',
            headers: {
                Authorization: sessionStorage.token
            }
        }).then((res)=> {
            if(res.data.message !== 'A package.json was not found'){
            this.props.update_outdated(res.data,'available')
            }
            else {
                this.props.update_outdated(res.data,'unavailable')
            }
            this.updateOverallScore(res);
        }).catch((res) => {
            console.log("catch outdate",res)
        })
    
    }

    updateFreqCom(){
        axios({
            url: '/api/git/commits',
            method: 'post',
            data: {
                username: this.state.username,
                repository: this.state.repo_url
            },
            headers: {
                Authorization: sessionStorage.token
            }
        })
        .then(res => {
            console.log('commit',res.data);
            this.props.update_frequency(res.data,'available')
        })
        
    }

    watchRepo(e){

        if( this.state.username === '' || this.state.repo_url === '' ){
            swal({
                title: "Information Required!",
                text: "Please fill in both informations",
                type: 'error'
            })
        }
        else {
              if(this.state.text === 'Watch'){

                axios({
                    url: '/api/git/repoinfo',
                    method: 'post',
                    data: {
                        username: this.state.username,
                        repository: this.state.repo_url
                    },
                    headers: {
                        Authorization: sessionStorage.token
                    }
                })
                .then(res => {
                    if (res.data === 'Information not found'){
                        swal({
                            title: "Username or Repository name not found",
                            text: "Please enter valid username or organization name and repository name",
                            type: "error",
                        });
                    }
                    else { 
                        window.scrollTo(0, 0);
                        this.props.update_watchrepo(res.data)
                        this.setState({text: 'Unwatch'})
                        this.updateFreqCom();
                        this.setState({
                            watch_status: true,
                            disabled: !this.state.disabled
                        })
                        this.cloneRepoFunction();
                        this.props.update_status(true);
                    }
                }).catch(err => {
                    console.log(err.data);
                })
            }
            if(this.state.text === 'Unwatch'){
                this.setState( {disabled: !this.state.disabled});
                document.getElementById("search-bar1").value = "";
                document.getElementById("search-bar2").value = "";
                this.setState({
                    username: '',
                    repo_url: '',
                    commit_data: [],
                    profile: [],
                    text: 'Watch'
                })
                swal({
                    title: "Git repository has been unwatched",
                    type: "success"
                })
                this.setState({
                    watch_status: false,
                })
                this.props.update_bugspot('','Loading...');
                this.props.update_complexity('','Loading...');
                this.props.update_duplicate('','Loading...');
                this.props.update_frequency('',0,'Loading...');
                this.props.update_outdated('','Loading...');
                this.props.update_status(false);
                this.setState({
                    overall_score: 0,
                })
            }
        }
    }

    onSubmit(e) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to use the monitor",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            axios.post('/api/user/logout',{username: this.props.profileUsername})
            if (result.value ) {
               sessionStorage.removeItem('token');
                swal({
                    title: 'Logged out',
                    text: 'You have logged out the system',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }
                ).then(
                    this.props.history.push("/")
                );   
            }
          })
     }
    
    render(){
        window.onbeforeunload = function() {
            sessionStorage.removeItem('token')
            return '';
          };
        const isWatched = this.state.watch_status;
        const isAlreadyAuthenticated = this.isAuthenticated();
        if( !isAlreadyAuthenticated){
            return (
                <Redirect to={{ pathname: '/'}}  /> 
            )
        }
        else {
        return (
            <div>
                <div className="landing">
                    <img src={logo} className="App-logo" alt="logo" />
                    <input id="search-bar1" className="search-input" type="text" name="search"  autoComplete="off" placeholder="Input username or organization name ..." required disabled={this.state.disabled} onChange={(e) => this.setState({username: e.target.value})}/>
                    <input id="search-bar2" className="search-input" type="text" name="search"   autoComplete="off" placeholder="Input repository name ..." required disabled={this.state.disabled} onChange={(e) => this.setState({repo_url: e.target.value})}/>
                        <button className="button" onClick= {(e) => this.watchRepo(e)} >{this.state.text}</button>  
                </div>
    
                { !isWatched ? (
                      <div>
                      <div className="sidenav">
                      <div className="sidebar-con">
                      <img className="img-profile-user" src={this.props.profile_img} alt="User"/>
                      <h2>Welcome</h2>
                      <h2 className="register-text">{this.props.profileUsername}</h2>
                      </div>
                      <button id="logoutBtn" className="andon-button" onClick= {(e) => this.onSubmit()}>Logout</button>
                        </div>
                    <UnwatchCard/>
                    </div>
                ) : (
                    <div>
                    <div className="sidenav">
                    <div className="sidebar-con">

                    <img className="img-profile-user" src={this.props.profile_img} alt="User"/>

                    <h2>Welcome</h2>
                    <h2 className="register-text">{this.props.profileUsername}</h2>
                    </div>
                    <a href="#main" className="andon-button">Notification Trigger</a>
                    <a href="#frequency" className="andon-button">Frequency of commit</a>
                    <a href="#duplicate" className="andon-button">Code Duplication</a>
                    <a href="#complexity" className="andon-button">Code Complexity</a>
                    <a href="#bugspot" className="andon-button">Bugspot Analyze</a>
                    <a href="#outdated" className="andon-button">Outdated Library</a>
                    <button id="logoutBtn" className="andon-button" onClick= {(e) => this.onSubmit()}>Logout</button>
                </div>
                    <WatchCard/>    
                    </div>      
                )}
            </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch){
    return {
        update_watchrepo: (profile) => dispatch(addWatchRepo(profile)),
        update_duplicate: (data,status) => dispatch(addDuplicate(data,status)),
        update_bugspot: (data,status) => dispatch(addBugspot(data,status)),
        update_complexity: (data,status) => dispatch(addComplexity(data,status)),
        update_frequency: (data,status) => dispatch(addFrequencyCommit(data,status)),
        update_outdated: (data, status) => dispatch(addOutdated(data,status)),
        update_status: (status) => dispatch(addStatus(status)),
        update_score: (score) => dispatch(addScore(score)),
    }
}

function mapStateToProps(state){
    return {
        profileUsername: state.cookie.username,
        gitName: state.cookie.gitName,
        profile_img: state.cookie.imgURL,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Monitor);
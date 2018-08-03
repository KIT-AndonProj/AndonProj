import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import '../stylesheets/sidebar.css';
import '../stylesheets/monitor.css';
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
            username: '',
            profile: '',
            commit_data: [],
            current_profile: [],
            watch_status: false,
            overall_score: 0,
            count_update: 0
        }
        this.props.update_score(0);
        this.props.update_bugspot('','Loading...');
        this.props.update_complexity('','Loading...');
        this.props.update_duplicate('','Loading...');
        this.props.update_frequency('','Loading...');
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
            this.props.update_bugspot(res.data,'Available')
            }
            else if ( res.data === 'Github API rate limit exceeded'){
                this.gitLimit()
            }
            else {
                this.props.update_bugspot(res.data,'Not found');
            }
            this.updateOverallScore(res);  
            this.updateStatus();        
        })
        .catch((res) => {
            this.gitLimit()
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
                this.props.update_complexity(res.data,'Available');
            }
            else if ( res.data === 'Github API rate limit exceeded'){
                this.gitLimit()
            }
            else {
                this.props.update_complexity(res.data,'Not found');
            }
            this.updateOverallScore(res);
            this.updateStatus();        
        })
        .catch(res=>{
            this.gitLimit()
        })  
    }

    cloneRepoFunction(){
        swal({
            title: 'Cloning Repository',
            text: 'Cloning...',
            allowOutsideClick: false,
            heightAuto: false,
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
                  }).catch((err)=>{
                      swal({
                          title: 'Error',
                          text: 'Please check your network connection',
                          type: 'error',
                          heightAuto: false,
                      }) 
                      this.props.update_bugspot('','Not Available');
                      this.props.update_complexity('','Not Available');
                      this.props.update_duplicate('','Not Available');
                      this.props.update_frequency('','Not Available');
                      this.props.update_outdated('','Not Available');
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
                this.props.update_duplicate(res.data,'Too many Duplications found');
            }
            else if ( res.data === 'Github API rate limit exceeded'){
                this.gitLimit()
            }
            else{
                this.props.update_duplicate(res.data,'Available')
            }
            this.updateOverallScore(res);
            this.updateStatus();        
        })
        .catch((res) => {
            this.gitLimit()
        })
    }

    updateStatus(){
        this.setState({ count_update: this.state.count_update+1})
        if ( this.state.count_update === 5 ){
            swal.close();
            this.setState({ count_update: 0});
        }
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
            this.props.update_outdated(res.data,'Available')
            }
            else if ( res.data === 'Github API rate limit exceeded'){
                this.gitLimit()
            }
            else {
                this.props.update_outdated(res.data,'Not found')
            }
            this.updateOverallScore(res);
            this.updateStatus();        
        }).catch((res) => {
            this.gitLimit()
        })
    }

    gitLimit(){
        sessionStorage.removeItem('token')
        swal({
            title: 'GitHub API rate limit exceeded',
            text: 'Please try again later',
            type: 'error',
            heightAuto: false
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
            if( res.data !== 'Github API rate limit exceeded'){
            this.props.update_frequency(res.data,'Available')
            this.updateStatus();        
            }
            else{
               this.gitLimit()
            }
        })
    }

    watchRepo(e){
        if( this.state.username === '' || this.state.repo_url === '' ){
            swal({
                title: "Information Required!",
                text: "Please fill in both informations",
                type: 'error',
                heightAuto: false,
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
                            heightAuto: false
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
                    console.log("WATCH REPO ERR : ",err.data);
                    this.gitLimit();
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
                    type: "success",
                    heightAuto: false
                })
                this.setState({
                    watch_status: false,
                })
                this.props.update_bugspot('','Loading...');
                this.props.update_complexity('','Loading...');
                this.props.update_duplicate('','Loading...');
                this.props.update_frequency('','Loading...');
                this.props.update_outdated('','Loading...');
                this.props.update_score(0);
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
            confirmButtonText: 'Yes',
            heightAuto: false
          }).then((result) => {
            axios.post('/api/user/logout',{username: this.props.profileUsername})
            if (result.value ) {
               sessionStorage.removeItem('token');
                swal({
                    title: 'Logged out',
                    text: 'You have logged out the system',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    heightAuto: false
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
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ">
                    <a className="navbar-brand animated bounceIn delay-5s">ANDON MONITOR</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <input id="search-bar1" className="form-control mr-sm-2" type="search" placeholder="Input Git Username" aria-label="Search" required disabled={this.state.disabled} onChange={(e) => this.setState({username: e.target.value})}/>
                        <input id="search-bar2" className="form-control mr-sm-2" type="search" placeholder="Input Repository" aria-label="Search" required disabled={this.state.disabled} onChange={(e) => this.setState({repo_url: e.target.value})}/>
                        <button className="btn btn-info my-2 my-sm-0" onClick= {(e) => this.watchRepo(e)} >{this.state.text}</button>
                    </div>
                    <button id="logoutBtn" className="btn btn-warning btn-lg animated bounceInLeft delay-5s" onClick= {(e) => this.onSubmit()}>Logout</button>
                    </nav>
                    { !isWatched ? (
                        <UnwatchCard/>    
                    ) : (
                       <WatchCard/>
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
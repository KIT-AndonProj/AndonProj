import React, {Component} from 'react';
// import DataCard from '../components/DataCard';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import '../stylesheets/sidebar.css';
import swal from 'sweetalert2';
import profile_img from '../res/user.jpg';
import '../stylesheets/search.css';
import logo from '../res/andon.png';
import '../stylesheets/dataCard.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip} from 'recharts';


// import Profile from '../components/Profile';
import NotificationCard from '../components/NotificationCard';
// import Chart from '../co mponents/Chart';

class Monitor extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            disabled: false,
            text: 'Watch',
            repo_url: '',
            username: '',
            profile: [],
            commit_data: [
                {name: 'Date', commit: 0}
            ]
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

    watchRepo(e){
        this.setState( {disabled: !this.state.disabled});
        if(this.state.text === 'Watch'){
            const user = {
                username: this.state.username,
                repository: this.state.repo_url,
            }
            console.log(user);
            axios.post('http://localhost:5000/api/git/repoinfo',user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (!true){
                    swal({
                        title: "Username or Repository name not found",
                        text: "Please enter valid username or organization name and repository name",
                        type: "error",
                    });
                }
                else { 
                    const profile = res.data;
                    this.setState({ profile});
                    this.setState({text: 'Unwatch'})
                    swal({
                        title: "Git repository is now watched",
                        type: "success"
                    })
                }
            })
            axios.post('http://localhost:5000/api/git/commits',user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const commit_data = res.data;
                this.setState({ commit_data });
            })
        }

         if(this.state.text === 'Unwatch'){
            document.getElementById("search-bar1").value = "";
            document.getElementById("search-bar2").value = "";
            this.setState({text: 'Watch'})
            const user = {
                username: '',
                repository: '',
            }
         axios.post('http://localhost:5000/api/git/repoinfo',user)
         .then(res => {
             res.date = '';
            const profile = res.data;
            this.setState({ profile});
         },
             swal({
                 title: "Git repository has been unwatched",
                 type: "success"
             })
         );
         console.log(user);

        }
    }

    onSubmit(e) {
        swal({
            title: "Logout Successful",
            type: "success"
        }).then(
         this.props.history.push("/login")
        );
        
        
     }

    render(){
       if(this.state.redirect){
           return (<Redirect to={'/login'}/>)
       }
        return (
        <div>
             <div className="landing">
                <img src={logo} className="App-logo" alt="logo" />
                <input id="search-bar1" className="search-input" type="text" name="search"  autoComplete="off" placeholder="Input username or organization name ..." required disabled={this.state.disabled} onChange={(e) => this.setState({username: e.target.value})}/>
                <input id="search-bar2" className="search-input" type="text" name="search"   autoComplete="off" placeholder="Input repository name ..." required disabled={this.state.disabled} onChange={(e) => this.setState({repo_url: e.target.value})}/>
                    <button className="button" onClick= {(e) => this.watchRepo(e)} >{this.state.text}</button>  
                </div>
             <div className="sidenav">
                <img id="userImg" src={profile_img} alt={profile_img}></img>
                <h2>Welcome!</h2>
                <button id="logoutBtn" onClick= {(e) => this.onSubmit()}>Logout</button>
            </div>
                <div className="parallax">
                <div className="container">
            <div className="card">
            <div>
            <div className="left-container">
       
        <div className="right-container">
        
        <h2>Repository Information</h2>
        <img className="userImg" src={this.state.profile.image_url} alt="User"/>
        </div>
        <p>Username : {this.state.profile.username}</p> 
        <p>Repository name : {this.state.profile.reponame}</p>
        <p>Created at : {this.state.profile.created_at}</p>
        <p>Updated at : {this.state.profile.updated_at}</p>
        <p>Pushed at : {this.state.profile.pushed_at}</p>
        <p>Issue : {this.state.profile.num_issue}</p>
        </div>
        </div>
            </div>
            <div className="card">
           
            <NotificationCard/>
            </div>
          </div>
                </div>
                <div className="parallax-2">  
                <h2>Frequency of commits</h2>
                <LineChart width={1500} height={500} data={this.state.commit_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="commit" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>             
                </div>
            </div>
        );
    }
}

export default Monitor;
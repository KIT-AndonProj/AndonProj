import React, {Component} from 'react';
import axios from 'axios';
// import {connect} from 'react-redux'
import profile_img from '../res/setting.png';


class Profile extends Component {

    constructor(props){
        super(props);
        this.state = { 
            profile: []
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/git/repoinfo').then(res => {
            const profile = res.data;
            this.setState({ profile});
        })
    }

render(){
    return (
        <div>
            <div class="left-container">
        {/* <img class="userImg" src={this.state.image_url} alt="User"/> */}
        <img class="userImg" src={profile_img} alt="User"/>
        </div>
        <div class="right-container">
        <p>Username : {this.state.profile.username}</p> 
        <p>Created at : {this.state.profile.create_at}</p>
        <p>Updated at : {this.state.profile.update_at}</p>
        <p>Pushed at : {this.state.profile.push_at}</p>
        <p>Issue : {this.state.profile.num_issue}</p>
        </div>
        </div>
        )
    }
}

export default (Profile);
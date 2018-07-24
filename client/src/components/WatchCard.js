import React, {Component} from 'react';
import {connect} from 'react-redux'
import NotificationCard from '../components/NotificationCard';
import OverallHealthCard from '../components/OverallHealthCard';
import DuplicateCard from '../components/DuplicateCard';
import ComplexityCard from '../components/ComplexityCard';
import FrequencyCommitCard from '../components/FrequencyCommitCard';
import BugspotCard from '../components/BugspotCard';
import OutdatedCard from '../components/OutdatedCard';

class WatchCard extends Component {

    render(){
        return(
            <div >
            <div className="parallax" id="main">
            <div className="row" >
                <div className="column">

             <div className="profile-con">
             
             <img className="img-profile" src={this.props.profile.image_url} alt="User"/>
             <div className="profile-con2">
             <h1>Repository Information</h1>
                 <p>Username : {this.props.profile.username}</p> 
                 <p>Repository name : {this.props.profile.reponame}</p>
                <p>Created at : {this.props.profile.created_at}</p>
                <p>Updated at : {this.props.profile.updated_at}</p>
                <p>Pushed at : {this.props.profile.pushed_at}</p>
                 <p>Issue : {this.props.profile.num_issue}</p>
                 </div>
            </div>
            </div>
            <div className="column" >
            <NotificationCard/>
            </div>
            <div className="column">
            <OverallHealthCard/>
            </div>
         
            </div>
            </div>
        
               
        <div id="frequency">
        <FrequencyCommitCard/>
        </div>
        <div id="duplicate">
        <DuplicateCard/>
       </div>
        <div id="complexity">
        <ComplexityCard/>
        </div>
        <div id="bugspot">
        <BugspotCard/>
        </div>
        <div id="outdated">
        <OutdatedCard/>
        </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.update_watchrepo.profile,
    }
}

export default connect(mapStateToProps)(WatchCard);
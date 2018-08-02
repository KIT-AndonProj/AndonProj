import React, {Component} from 'react';
import {connect} from 'react-redux'
import NotificationCard from '../components/NotificationCard';
import OverallHealthCard from '../components/OverallHealthCard';
import DuplicateCard from '../components/DuplicateCard';
import ComplexityCard from '../components/ComplexityCard';
import FrequencyCommitCard from '../components/FrequencyCommitCard';
import BugspotCard from '../components/BugspotCard';
import OutdatedCard from '../components/OutdatedCard';
import '../stylesheets/watch.css';

class WatchCard extends Component {

    render(){
        return(
          <div className="container-fluid">
              <div className="row">
              <div className="col-sm-2">
                    <nav className="navbar navbar-default" id="myScrollspy">
                    <div className="container">
                    <div id="sidebar-wrapper" className="sidebar-toggle">
                    <ul className="nav nav-pills flex-column" id="padding">
              <img  className="img-profile-user animated bounceInLeft delay-5s" src={this.props.profile_img} alt="User"/>
              <h2  className="animated bounceInLeft delay-5s"> Welcome </h2>
              <h3  className="animated bounceInLeft delay-5s">{this.props.profileUsername}</h3>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info active animated fadeInLeft delay-5s" href="#notification">Notification</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info animated fadeInLeft delay-5s" href="#frequency">Code Commits</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info animated fadeInLeft delay-5s" href="#duplicate">Code Duplicate</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info animated fadeInLeft delay-5s" href="#complex">Code Complexity</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info animated fadeInLeft delay-5s" href="#bugspot">Bugspot Analyze</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn-outline-info animated fadeInLeft delay-5s" href="#outdated">Outdated Library</a>
                </li>
                </ul>
                        </div>
                    </div>
                    </nav>
                    </div>
             
                
              <div className="col-sm-10 col-8" id="watch-div">
              <div className="info"id="notification"> 
                <h1>Overall Information</h1>
                <div className="row" id="nomargin">
                <div className="col-md-6">
                <div id="overall-card"className="card border-0 animated bounceInLeft delay-5s">
                <img className="card-img-top" src={this.props.profile.image_url} alt="img"/>
                    <div className="card-body">
                    <h4 className="card-title">Watched Repository Information</h4>
                      <p className="card-text">Username : {this.props.profile.username}</p> 
                      <p className="card-text">Repository name : {this.props.profile.reponame}</p>
                      <p className="card-text">Created at : {this.props.profile.created_at}</p>
                      <p className="card-text">Updated at : {this.props.profile.updated_at}</p>
                      <p className="card-text">Pushed at : {this.props.profile.pushed_at}</p>
                      <p className="card-text">Issue : {this.props.profile.num_issue}</p>
                </div>
                    </div>
                </div>
                <div className="col-md-6">
                <div id="overall-card"className="card border-0 animated bounceInRight delay-5s">
                        <div className="card-body">
                        <h4 className="card-title">Notification Trigger</h4>
                        <NotificationCard/>
                    </div>
                </div>
                <div id="overall-card"className="card border-0 animated bounceInRight delay-5s">
                        <div className="card-body">
                        <h4 className="card-title">Repository Overall Score</h4>
                        <OverallHealthCard/>
                    </div>
                </div>
                </div>
                </div>
              </div> 
              <div className="info" id="frequency"> 
                <h1>Frequency Commits of Repository</h1>
                <FrequencyCommitCard/>
              </div> 
              <div className="info" id="duplicate"> 
                <h1>Repository Code Duplicate Risk</h1>           
                <div className="card border-0">
                <DuplicateCard/>
                </div>
              </div> 
              <div className="info" id="complex"> 
                <h1>Repository Code Complexity Risk</h1>
                <div className="card border-0">
                <ComplexityCard/>
                </div>
              </div> 
              <div className="info" id="bugspot"> 
                <h1>Repository Bugspot Analyze</h1>
                <div className="card border-0">
                <BugspotCard/>
                </div>
              </div> 
              <div className="info" id="outdated"> 
                <h1>Repository Outdated Library</h1>
                <div className="card border-0">
                <OutdatedCard/>
                </div>
              </div> 
              <br/>
              </div>
              </div>
              </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.update_watchrepo.profile,
        profileUsername: state.cookie.username,
        profile_img: state.cookie.imgURL,
    }
}

export default connect(mapStateToProps)(WatchCard);
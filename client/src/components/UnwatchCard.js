import React, {Component} from 'react'
import FrequencyCommitCard from '../components/FrequencyCommitCard';
import {connect} from 'react-redux';
import '../stylesheets/unwatch.css';
class UnwatchCard extends Component {

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2" id="myScrollspy">
                    <nav className="navbar navbar-default">
                    <div className="container">
                    <div id="sidebar-wrapper" className="sidebar-toggle">
                    <ul className="nav nav-pills flex-column" id="padding">
                            <img className="img-profile-user animated bounceInLeft delay-5s" src={this.props.profile_img} alt="User"/>
                            <h2 className="animated bounceInLeft delay-5s"> Welcome </h2>
                            <h3 className="animated bounceInLeft delay-5s">{this.props.profileUsername}</h3>
                        </ul>
                        </div>
                    </div>
                    </nav>
                    </div>
                    <div className="col-sm-10 col-8" id="margin-info">
                        <div id="notification"> 
                            <h1>Overall Information</h1>
                            <div className="container-fluid">
                                <div className="row" id="nomargin">
                                    <div className="col-md-6">
                                        <div id="overall-card"className="card border-0 animated bounceInLeft delay-5s">
                                            <img className="card-img-top" src={this.props.current_profile.image_url} alt="img"/>
                                            <div className="card-body">
                                                <h4 className="card-title">Current Repository Information</h4>
                                                <p className="card-text">Username : {this.props.current_profile.username}</p> 
                                                <p className="card-text">Repository name : {this.props.current_profile.reponame}</p>
                                                <p className="card-text">Created at : {this.props.current_profile.created_at}</p>
                                                <p className="card-text">Updated at : {this.props.current_profile.updated_at}</p>
                                                <p className="card-text">Pushed at : {this.props.current_profile.pushed_at}</p>
                                                <p className="card-text">Issue : {this.props.current_profile.num_issue}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div id="overall-card"className="card border-0 animated bounceInRight delay-5s">
                                            <h4 className="card-title">Frequency of Commits</h4>
                                            <FrequencyCommitCard/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        current_profile: state.current_repo.profile,
        current_commit: state.current_repo.commit_data,
        profileUsername: state.cookie.username,
        profile_img: state.cookie.imgURL,
    }
}

export default connect(mapStateToProps)(UnwatchCard);
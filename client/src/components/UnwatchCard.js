import React, {Component} from 'react'
import FrequencyCommitCard from '../components/FrequencyCommitCard';
import {connect} from 'react-redux';
import '../stylesheets/unwatch.css';
class UnwatchCard extends Component {

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-sm-3 col-4" id="myScrollspy">
                        <ul className="nav nav-pills flex-column">
                            <img className="img-profile-user animated bounceInLeft delay-5s" src={this.props.profile_img} alt="User"/>
                            <h2 className="animated bounceInLeft delay-5s"> Welcome </h2>
                            <h3 className="animated bounceInLeft delay-5s">{this.props.profileUsername}</h3>
                        </ul>
                    </nav>
                    <div className="col-sm-9 col-8">
                        <div className="info"id="notification"> 
                            <h1>Overall Information</h1>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-auto">
                                        <div id="overall-card"class="card border-0 animated bounceInLeft delay-5s">
                                            <img class="card-img-top" src={this.props.current_profile.image_url} alt="img"/>
                                            <div class="card-body">
                                                <h4 class="card-title">Current Repository Information</h4>
                                                <p class="card-text">Username : {this.props.current_profile.username}</p> 
                                                <p class="card-text">Repository name : {this.props.current_profile.reponame}</p>
                                                <p class="card-text">Created at : {this.props.current_profile.created_at}</p>
                                                <p class="card-text">Updated at : {this.props.current_profile.updated_at}</p>
                                                <p class="card-text">Pushed at : {this.props.current_profile.pushed_at}</p>
                                                <p class="card-text">Issue : {this.props.current_profile.num_issue}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-auto">
                                        <div id="overall-card"class="card border-0 animated bounceInRight delay-5s">
                                            <h4 class="card-title">Frequency of Commits</h4>
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
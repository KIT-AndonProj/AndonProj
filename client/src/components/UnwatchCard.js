import React, {Component} from 'react'
import FrequencyCommitCard from '../components/FrequencyCommitCard';
import {connect} from 'react-redux'

class UnwatchCard extends Component {

    render(){
        return(
            <div className="parallax">
                <div className="row" >
                    <div className="column-unwatch">
                        <div className="profile-con">
                            <img className="img-profile" src={this.props.current_profile.image_url} alt="User"/>
                            <div className="profile-con2">
                            <h1>Repository Information</h1>
                            <p>Username : {this.props.current_profile.username}</p> 
                            <p>Repository name : {this.props.current_profile.reponame}</p>
                            <p>Created at : {this.props.current_profile.created_at}</p>
                            <p>Updated at : {this.props.current_profile.updated_at}</p>
                            <p>Pushed at : {this.props.current_profile.pushed_at}</p>
                            <p>Issue : {this.props.current_profile.num_issue}</p>
                            </div>
                        </div>
                    </div>
                    <FrequencyCommitCard/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        current_profile: state.current_repo.profile,
        current_commit: state.current_repo.commit_data
    }
}
export default connect(mapStateToProps)(UnwatchCard);
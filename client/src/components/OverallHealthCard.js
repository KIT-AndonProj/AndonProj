import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Progress } from 'react-sweet-progress';


class OverallHealthCard extends Component {

    render(){
        if( this.props.watch_status ){
            return(
                <div className="card bg-light" >
                    <h4 className="card-title" id="card-title-text">Repository Overall Score</h4>
                    <div id="padding">
                   <Progress
                    type="circle"
                    percent={this.props.score}
                    />
                    <p>Risk of Code Duplication : {this.props.duplicate_score}</p>
                    <p>Risk of Code Complexity : {this.props.complexity_score}</p>
                    <p>Bugspot Analyze score : {this.props.bugspot_score}</p>
                    <p>Outdated Library score : {this.props.outdated_score}</p>
                    <p>Overall Code Risk score : {this.props.score}</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                <p>No overall health score.</p> 
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        duplicate_score: state.update_duplicate.data.overallHealth,
        complexity_score: state.update_complexity.data.overallHealth,
        bugspot_score: state.update_bugspot.data.overallHealth,
        outdated_score: state.update_outdated.data.overallHealth,
        watch_status: state.update_status.status,
        score: state.update_score.score
    }
}

export default (connect)(mapStateToProps)(OverallHealthCard);
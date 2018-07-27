import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Progress } from 'react-sweet-progress';


class OverallHealthCard extends Component {

    render(){
        if( this.props.watch_status ){
            return(
                <div className="health-con">
                    <h1>Overall Health Score</h1>
                    <Progress
                    type="circle"
                    percent={this.props.score}
                    />
                    <p>Code Duplication score : {this.props.duplicate_score}</p>
                    <p>Code Complexity score : {this.props.complexity_score}</p>
                    <p>Bugspot Analyze score : {this.props.bugspot_score}</p>
                    <p>Outdated Library score : {this.props.outdated_score}</p>
                    <p>Total Score : {this.props.score}</p>
                </div>
            )
        }
        else {
            return (
                <div className="health-con">
                <h1>Overall Health Score</h1>
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
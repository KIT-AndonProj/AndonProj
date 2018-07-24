import React, {Component} from 'react';
import '../stylesheets/notification.css';
import swal from 'sweetalert2'
import axios from 'axios';
import {connect} from 'react-redux'

class NotificationCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            select_trigger: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleChange(e) {
        this.setState({
          select_trigger: e.target.value
        });
      }

      handleSubmit(event) {
        event.preventDefault();
        if (this.state.select_trigger === 'duplicate'){
        axios({
            url: 'api/board/:duplication',
            method: 'post',
            headers: {
                Authorization: sessionStorage.token
                },
            body: {
                value:  this.props.duplicate_data.duplicate_data.overallHealth
                }    
            })
            console.log('Duplicate',this.props.duplicate_data.duplicate_data.overallHealth);
        }
        else if (this.state.select_trigger === 'bugspot'){
            axios({
                url: 'api/board/:bugspot',
                method: 'post',
                headers: {
                    Authorization: sessionStorage.token
                    },
                body: {
                    value:  this.props.bugspot_data.bugspot_data.overallHealth
                    }    
                })
                console.log('Bugspot',this.props.bugspot_data.bugspot_data.overallHealth);
        }
        else if (this.state.select_trigger === 'complex'){
            axios({
                url: 'api/board/:complexity',
                method: 'post',
                headers: {
                    Authorization: sessionStorage.token
                    },
                body: {
                    value:  this.props.complex_data.complexity_data.overallHealth
                    }    
                })
                console.log('Complexity', this.props.complex_data.complexity_data.overallHealth);
        }
        else if (this.state.select_trigger === 'outdated'){
            axios({
                url: 'api/board/:outdated',
                method: 'post',
                headers: {
                    Authorization: sessionStorage.token
                    },
                body: {
                    value:  this.props.outdated_data.outdated_data.overallHealth
                    }    
                })
                console.log('Outdated : ', this.props.outdated_data.outdated_data.overallHealth );
        }
        else if( this.state.select_trigger === 'frequency'){
            axios({
                url: 'api/board/:frequency',
                method: 'post',
                headers: {
                    Authorization: sessionStorage.token
                    },
                body: {
                    value:  this.props.freqCommit_data.frequency_data
                }    
                })
                console.log('Frequency: ',this.props.freqCommit_data.frequency_data);
        }
        else if (this.state.select_trigger ==='overallHealth'){
            axios({
                url: 'api/board/:overall',
                method: 'post',
                headers: {
                    Authorization: sessionStorage.token
                },
                body: {
                    value: this.props.overall_data.score
                }
            })
            console.log('Overall ', this.props.overall_data.score)
        }
        swal({
            title: 'Notification Changed!',
            type: 'success'
        })
    }

    
    render(){
    return (
    <div className="notification-con">
        <form onSubmit={this.handleSubmit}>
        <h1>Notification Trigger</h1>
            <label className="container">Overall Health
            <input type="radio" value="overallHealth" checked={this.state.select_trigger==="overallHealth"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <label className="container">Frequency of Commits : {this.props.freqCommit_data.status}
            <input type="radio" value="frequency" checked={this.state.select_trigger==="frequency"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <label className="container">Code Duplication : {this.props.duplicate_data.status}
            <input type="radio" value="duplicate" checked={this.state.select_trigger==="duplicate"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <label className="container">Code Complexity : {this.props.complex_data.status}
            <input type="radio" value="complex" checked={this.state.select_trigger==="complex"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <label className="container">Bugspot Analyze : {this.props.bugspot_data.status}
            <input type="radio" value="bugspot" checked={this.state.select_trigger==="bugspot"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <label className="container">Outdated Library : {this.props.outdated_data.status}
            <input type="radio" value="outdated" checked={this.state.select_trigger==="outdated"} onChange={this.handleChange}/>
            <span className="checkmark"></span>
            </label>
            <button type="submit" className="andon-button">Notify to Andon Model</button>
        </form>
    </div>
    );
    }
}

function mapStateToProps(state){
    return {
        freqCommit_data : state.update_frequency,
        duplicate_data: state.update_duplicate,
        complex_data: state.update_complexity,
        bugspot_data: state.update_bugspot,
        outdated_data: state.update_outdated,
        overall_data: state.update_score
    }
}


export default connect(mapStateToProps)(NotificationCard);
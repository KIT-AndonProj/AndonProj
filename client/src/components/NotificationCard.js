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
            bugspot_score: 0,
            command : ['overall','frequency','duplicate','complex','bugspot','outdated']
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
        const command_index = this.state.command.indexOf(this.state.select_trigger);
        let command_selected = this.state.command[command_index];
        let value = 0;
        event.preventDefault();
        if (command_selected !== undefined){
            if(command_selected === 'overall'){
                value = this.props.data[0].score;
            }
            else if (command_selected === 'frequency' ){
                value = this.props.data[1].data;
            }
            else if (command_selected === 'duplicate' || command_selected === 'complex' || command_selected === 'bugspot' || command_selected === 'outdated'){
                if(this.props.data[command_index].status === 'Not Available'){
                    value = 0;
                }
                else {
                    value = this.props.data[command_index].data.overallHealth;
                }
            }
            swal({
                title: 'Notify Aquatan',
                text: 'Notifying...',
                allowOutsideClick: false,
                heightAuto: false,
                onOpen: ()=> {
                    swal.showLoading();
                    axios({
                        url: 'api/board/'+command_selected,
                        method: 'post',
                        headers: {
                            Authorization: sessionStorage.token
                            },
                        data: {
                            value:  value
                            }    
                    }).then((res) => {
                        if(res.data==='Finish'){
                            swal.close();
                        }
                    })
                }
            })
        }
        else {
            swal({
                title: 'No trigger select!',
                text: 'Please select one trigger',
                type: 'error',
                heightAuto: false
            });
        }
    }

    render(){
        return (
            <div className="card bg-light" id="nomargin">
                       <h3 className="card-title" id="card-title-text">Notification Trigger</h3>

                        <div className="card-body" id="nomargin">
                        <div>
                    <form onSubmit={this.handleSubmit}>
                            <label className="input-container">Overall Risk of Repository
                        <input type="radio" value="overall" checked={this.state.select_trigger==="overall"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="input-container">Frequency of Commits : {this.props.data[1].status}
                        <input type="radio" value="frequency" checked={this.state.select_trigger==="frequency"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="input-container">Risk of Code Duplication : {this.props.data[2].status}
                        <input type="radio" value="duplicate" checked={this.state.select_trigger==="duplicate"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="input-container">Risk of Code Complexity : {this.props.data[3].status}
                        <input type="radio" value="complex" checked={this.state.select_trigger==="complex"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="input-container">Bugspot Analyze : {this.props.data[4].status}
                        <input type="radio" value="bugspot" checked={this.state.select_trigger==="bugspot"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="input-container">Outdated Library : {this.props.data[5].status}
                        <input type="radio" value="outdated" checked={this.state.select_trigger==="outdated"} onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                        </label>
                        <button  className="btn btn-primary" type="submit">Notify to Andon Model</button>
                    </form>
                </div>
                        </div>
                    </div>



        );
    }
}

function mapStateToProps(state){
    return {
        data : [
            state.update_score,
            state.update_frequency,
            state.update_duplicate,
            state.update_complexity,
            state.update_bugspot,
            state.update_outdated,
        ],
    }
}

export default connect(mapStateToProps)(NotificationCard);
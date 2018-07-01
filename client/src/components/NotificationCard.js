import React, {Component} from 'react';
import '../stylesheets/notification.css';
import swal from 'sweetalert2'
import Axios from 'axios';

class NotificationCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            overall_health: true,
            freq_commit : true,
            bugspot_score : true,
            num_issues : true,
            fault_proness : true
        };
    }

    handleSubmit(e){
        console.log(e)
        swal({
            type: 'success',
            title: 'Notification has been changed',
            showConfirmButton: false,
            timer: 1500
          })
    }
    render(){
    return (
    <div>
    <h1>Notification Trigger</h1>
                <label className="container-label">Overall health risk
                <input type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container-label">Frequency of commits
                <input type="checkbox" />
                <span className="checkmark"></span>
                </label>
                <label className="container-label">The score of bugspot
                <input type="checkbox" />
                <span className="checkmark"></span>
                </label>
                <label className="container-label">Number of issues
                <input type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <label className="container-label">Fault-proness
                <input type="checkbox"/>
                <span className="checkmark"></span>
                </label>
                <button id="submitBtn" onClick={(e)=>this.handleSubmit(e)}>Apply</button>
        </div>
    );
    }
}

export default NotificationCard;
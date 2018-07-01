import React, {Component} from 'react';
import profile_img from '../res/user.jpg';
import '../stylesheets/sidebar.css';
import { push } from 'react-router-dom';
import swal from 'sweetalert2';

class Sidebar extends Component {

    onSubmit(e) {
       swal({
           title: "Logout Successful",
           type: "success"
       }).then(
        this.props.history.push("/login")
       );
       
    }
    render(){
        return(
            <div class="sidenav">
                <img id="userImg" src={profile_img}></img>
                <h2>Welcome!</h2>
                <button id="logoutBtn" onClick= {(e) => this.onSubmit()}>Logout</button>
            </div>
        );
    }   


}

export default Sidebar;
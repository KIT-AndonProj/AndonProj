import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import '../../stylesheets/register.css';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password2: '',
            git_username: '',
            imgURL: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
        
    }

  
    // checkPassword(){
    //     if(this.state.password === this.state.password2){
    //         console.log('SAME')
    //         return true;
    //     }
    //     else {
    //         console.log('Not same')
    //         return false;
    //     }
    // }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            git_username: this.state.git_username,
            imgURL: this.state.imgURL
        }

        console.log(newUser);
        axios.post('http://localhost:5000/api/user/register', newUser)
            .then(
                (res) => {
                    console.log(res.data)
                    swal({
                        title: "User created",
                        type: "success"
                    }).then((res) => {
                        this.props.history.push("/login");
                    })
                })
            .catch( (err) => {
                console.log(err)
                swal({
                    title: "Error",
                    text: "Incorrect Information",
                    type: "error"
                })
            })
        }
        
    
    render() {
        return (
                // <div class="parallax">
                <div>
                    <h1>Create Account</h1>
                    <form onSubmit = {this.onSubmit}>
                    <h2 className="label">USERNAME</h2>
                    <input type="text" autocomplete="off" placeholder="Username" name="username" value={this.state.username} required onChange={this.onChange}></input>
                    <h2 className="label">USER REPOSITORY</h2>
                    <input type="text" autocomplete="off" placeholder="Git URL" name="gitURL" value={this.state.git_username} required onChange={this.onChange}></input>
                    <h2 className="label">USER PHOTO <strong> ** MUST SEE FACE CLEARLY **</strong></h2>
                    <input type="file" className="input-text" required onChange={(e) => this.setState({imgURL: e.target.value.replace("C:\\fakepath\\", "")})}/>                    
                    <h2 className="label">PASSWORD</h2>
                    <input type="password" autocomplete="off" placeholder="Password" name="password" value={this.state.password} required onChange={this.onChange}></input>
                    <h2 className="label">CONFIRM PASSWORD</h2>
                    <input type="password" autocomplete="off" placeholder="Comfirm Password" name="password2" value={this.state.password2} required onChange={this.onChange}></input>
                    <input type="submit"/>
                </form>
            </div>
            // </div>
        )
    }
}

export default Register
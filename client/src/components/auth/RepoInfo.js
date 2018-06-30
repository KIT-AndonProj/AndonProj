import React, { Component } from 'react';
import axios from 'axios';

class RepoInfo extends Component {
    constructor() {
        super()
        this.state = {
            username: 'crsherbet',
            repository: 'memonkeyproj',
            username2: '',
            reponame: '',
            created_at: '',
            updated_at: '',
            pushed_at: '',
            num_issue: '',
            image_url: '',
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            repository: this.state.repository,
        }
        console.log(user);

        axios.post('/api/git/repoinfo', user)
        .then(res => { 
            //this.setState
            console.log(res.data.username) // this.state.username2 = res.data.username
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.onSubmit}>
                    <input type="submit"/>
                </form>
               
            </div>
        )
    }
}

export default RepoInfo
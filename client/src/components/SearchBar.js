import React, {Component} from 'react';
import axios from 'axios'
import '../stylesheets/search.css';
import logo from '../res/andon.png';
import swal from 'sweetalert2'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            text: 'Watch',
            repo_url: '',
        };
    };

    watchRepo(e){
        this.setState( {disabled: !this.state.disabled});
        if(this.state.text === 'Watch'){
         this.setState({text: 'Unwatch'})
         axios.post('http://localhost:3000/watched/',{
            repo_url: this.state.repo_url
        }).then(
            swal({
                title: "Git repository is now watched",
                type: "success"
            })
        );
        console.log(this.state.repo_url);
        }
         if(this.state.text === 'Unwatch'){
         this.setState({text: 'Watch'})
         axios.post('http://localhost:3000/watched/',{
             repo_url: ''
         }).then(
             swal({
                 title: "Git repository has been unwatched",
                 type: "error"
             })
         );
         console.log(this.state.repo_url);
        }
    }
    
    render() {
    return(
        <div class="landing">
        <img src={logo} className="App-logo" alt="logo" />

         <input id="search-bar" class="searc≈h-input" type="text" name="search" placeholder="Input username ..." required disabled={this.state.disabled} onChange={(e) => this.setState({repo_url: e.target.value})}/>
         <input id="search-bar" class="searc≈h-input" type="text" name="search" placeholder="Input repository ..." required disabled={this.state.disabled} onChange={(e) => this.setState({repo_url: e.target.value})}/>
            <button class="button" onClick= {(e) => this.watchRepo(e)} >{this.state.text}</button>  
        </div>
    );
};
}

export default (Search);

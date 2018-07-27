import React, {Component} from'react';
import '../stylesheets/camera.css';

class Camera extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render(){
        return(
            <div className="parallax">
            <h1>Scan your face</h1>
            <img src={require('../res/search-yellow.png')}/>
            </div>
        );
    }
}

export default Camera;
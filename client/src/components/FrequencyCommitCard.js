import React, { Component } from 'react';
import { connect }from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip} from 'recharts';
import '../stylesheets/frequency.css'
class FrequencyCommitCard extends Component {
   
            render(){
            if(this.props.current_commit !== 'Information not found'){
                if(this.props.commit_data.length === 0   ){ 
                    const data = this.props.current_commit;
                return (
                    <div className="column-unwatch2">
                        <div className="frequency-con">
                    <h2 id="header">Frequency of Commit</h2>
                    <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="commit" stroke="#0042FF" />
                    <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart> 
                </div>
                </div>
                );
            }
                    else {
                        const data = this.props.commit_data;
                        if( this.props.commit_data === 'Information not found'){
                            return <div></div>
                        }
                        else {
                    return (
                        <div className="parallax-2" id='frequency'> 
                        <h2 id="header">Frequency of commit</h2>
                        <LineChart width={1500} height={700} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="commit" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart> 
                    </div>
                    );
                }
            }
            }
         
            else {
                return (
                    <div className="column-unwatch">
                        <div className="frequency-con">
                        <h2 id="header">Frequncy of commit</h2>
                        <h2>No data shown. Either no commits in your repository or please watch the repository.</h2>
                    </div>
                    </div>
                );
            }
               
            
        }
}

function mapStateToProps(state){
    return{
    current_commit: state.current_repo.commit_data,
    commit_data: state.update_frequency.frequency_data
    }
}

export default connect(mapStateToProps)(FrequencyCommitCard);
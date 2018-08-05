import React, { Component } from 'react';
import { connect }from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip, ResponsiveContainer} from 'recharts';
import '../stylesheets/frequency.css'
class FrequencyCommitCard extends Component {
   
    render(){
        if(this.props.current_commit !== 'Information not found'){
            if(this.props.commit_data.length === 0   ){ 
                const data = this.props.current_commit;
                return (
                    <div id="container">
                    <ResponsiveContainer width="100%" height="60%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>>
                        <Line type="monotone" dataKey="commit" stroke="#0042FF" />
                        <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        </LineChart> 
                    </ResponsiveContainer>
                    </div>
                );
            }
            else {
                const data = this.props.commit_data;
                if( this.props.commit_data === 'Information not found'){
                    return(
                        <div>
                        <div className="card text-white bg-danger mb-3" id="nomargin">
                            <div className="card-header" id="nomargin">Frequency Commits of Repository Not Found</div>
                            <div className="card-body" id="nomargin">
                                <p className="card-text">There is no recently commits in your repository.</p>
                            </div>
                        </div>
                    </div>
                );
                    
                }
                else {
                    return (
                        <div id="container2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey="commit" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart> 
                            </ResponsiveContainer>
                        </div>
                    );
                }
            }
        } 
        else {
            return (
                <div className="column-unwatch">
                    <div className="frequency-con">
                        <h2 id="header">Frequency of commit</h2>
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
    commit_data: state.update_frequency.data
    }
}

export default connect(mapStateToProps)(FrequencyCommitCard);
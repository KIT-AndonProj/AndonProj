import React, { Component } from 'react';
import { Pie, PieChart, Tooltip ,ResponsiveContainer} from 'recharts'
import { connect } from 'react-redux'

class DuplicateCard extends Component {
    render(){
        if ( this.props.status === 'Available'){
            const data = [ 
                {name: 'Duplicate', value: this.props.duplicate_data.percentage}, 
                { name: 'Non duplicate', value: 100-this.props.duplicate_data.percentage}];
            return(
                <div className="row">
                    <div className="col-md-4">
                        <p className="card-text">Clone: {this.props.duplicate_data.clones}</p>
                        <p className="card-text">Duplicate: {this.props.duplicate_data.duplications}</p>
                        <p className="card-text">Files: {this.props.duplicate_data.files}</p>
                        <p className="card-text">Lines: {this.props.duplicate_data.lines}</p>
                    </div>
                    <div className="col-md-8">
                        <div id="container2">
                            <ResponsiveContainer width="100%" height="60%">
                                <PieChart>
                                    <Pie data={data} dataKey="value" innerRadius={100} outerRadius={200} fill="#82ca9d"/>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Too many of duplications found!</p>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        duplicate_data: state.update_duplicate.data,
        status: state.update_duplicate.status
    }
}

export default connect(mapStateToProps)(DuplicateCard);
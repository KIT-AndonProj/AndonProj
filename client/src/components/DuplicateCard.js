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
                    <div className="card border-0 ">
                        <label className="label-text">Clone: {this.props.duplicate_data.clones}</label>
                        <label className="label-text">Duplicate: {this.props.duplicate_data.duplications}</label>
                        <label className="label-text">Files: {this.props.duplicate_data.files}</label>
                        <label className="label-text">Lines: {this.props.duplicate_data.lines}</label>
                    </div>
                    </div>
                    <div className="col-md-8">
                    <div className="card border-0 ">
                        <div id="container3">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Pie isAnimationActive={false} data={data} dataKey="value" cx={250} cy={160} outerRadius={160} fill="#8884d8" label/>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="card text-white bg-danger" id="nomargin">
                        <div className="card-header" id="nomargin">Duplications Data Not Shown</div>
                        <div className="card-body" id="nomargin">
                            <p className="card-text">Repository has too many duplications</p>
                        </div>
                    </div>
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
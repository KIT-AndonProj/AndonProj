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
                        <p className="card-text">Clone: {this.props.duplicate_data.clones}</p>
                        <p className="card-text">Duplicate: {this.props.duplicate_data.duplications}</p>
                        <p className="card-text">Files: {this.props.duplicate_data.files}</p>
                        <p className="card-text">Lines: {this.props.duplicate_data.lines}</p>
                    </div>
                    </div>
                    <div className="col-md-8">
                    <div className="card border-0 ">
                        <div id="container3">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Pie isAnimationActive={false} data={data} cx={250} cy={160} outerRadius={160} fill="#8884d8" label/>
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
                    <div class="card bg-light" id="nomargin">
                        <div class="card-header" id="nomargin">Information Not Available</div>
                        <div class="card-body" id="nomargin">
                            <p class="card-text">Repository has too many duplications</p>
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
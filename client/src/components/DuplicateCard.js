import React, { Component } from 'react';
import '../stylesheets/duplicate.css'
import { Pie, PieChart, Tooltip } from 'recharts'
import { connect } from 'react-redux'


class DuplicateCard extends Component {
    

    render(){
        if ( this.props.duplicate_data.status === 'available'){
        const data = [ 
            {name: 'Duplicate', value: this.props.duplicate_data.percentage}, 
            { name: 'Non duplicate', value: 100-this.props.duplicate_data.percentage}];
        return(
            <div className="parallax-2">
                <h2 id="header">Code Duplication</h2>
                <h2>Clone: {this.props.duplicate_data.clones}</h2>
                <h2>Duplicate: {this.props.duplicate_data.duplications}</h2>
                <h2>Files: {this.props.duplicate_data.files}</h2>
                <h2>Lines: {this.props.duplicate_data.lines}</h2>
                <div className="c"> <PieChart width={1000} height={1000}>
                    <Pie data={data} cx={500} cy={500} innerRadius={175} outerRadius={350} fill="#82ca9d" dataKey="data"/>
                    <Tooltip/>
                </PieChart>
                </div>      
               
                </div>
        );
    }
    else {
        return (
            <div className="parallax-2">
                <h2 id="header">Code Duplication</h2>
                <h2>No data show. Duplication of code not found.</h2>
            </div>
        );
    }
    }
}



function mapStateToProps(state){
    return {
        duplicate_data: state.update_duplicate.duplicate_data,
        status: state.update_duplicate.status
    }
}

export default connect(mapStateToProps)(DuplicateCard);
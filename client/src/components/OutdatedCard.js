import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class OutdatedCard extends Component {
    
    render(){
        if(this.props.status === 'available'){
        return(
            <div className="parallax-2">
                <h2 id="header">Outdated Library</h2>
                <ReactTable
                data={this.props.outdated_data}
                columns={[
                    {
                        Header: "Module Name",
                        accessor: "moduleName"
                    },
                    {
                        Header: "Home Page",
                    accessor:"homepage"
                    },
                    {
                        Header: "Latest Version",
                        accessor:"latest"
                    },
                    {
                        Header:"Installed Version",
                        accessor: "installed"
                    },
                ]}
                    defaultPageSize={10}
                    style={{
                    height: "600px"
                    }}
                    className="-striped -highlight"
                />
                <br />
                </div>    
            );
        }
        else {
            return (
                <div className="parallax-2">
                <h2 id="header">Outdated Library</h2>
                <h2>No information available. Due to no package.json in your repository</h2>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        outdated_data: state.update_outdated.data.resultObj,
        status: state.update_outdated.status
    }
}

export default connect(mapStateToProps)(OutdatedCard);
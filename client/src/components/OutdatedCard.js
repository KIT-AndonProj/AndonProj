import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class OutdatedCard extends Component {
    
    render(){
        if(this.props.status === 'Available'){
        return(
            <BootstrapTable data={this.props.outdated_data} 
            containerStyle={  { margin: 0 }} 
            bodyStyle={{ margin: 0 }}
            headerStyle={ {margin: 0}}
            tableStyle={ { margin: 0 } }
            pagination striped hover>
                <TableHeaderColumn isKey dataField='moduleName'>Module Name</TableHeaderColumn>
                <TableHeaderColumn dataField='homepage'>Home Page</TableHeaderColumn>
                <TableHeaderColumn dataField='latest'>Latest Version</TableHeaderColumn>
                <TableHeaderColumn dataField='latest'>Latest Version</TableHeaderColumn>
                <TableHeaderColumn dataField='installed'>Installed Version</TableHeaderColumn>
            </BootstrapTable>            
            );
        }
        else {
            return (
                <div>
                <p>No information available. Due to no package.json in your repository</p>
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
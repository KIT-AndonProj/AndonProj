import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class OutdatedCard extends Component {
    
    render(){
        if(this.props.status === 'Available'){
            const options = {
                sizePerPageList: [ {
                    text: 'All', value: this.props.outdated_data.length
                  } ]              };
        return(
            <BootstrapTable data={this.props.outdated_data} dataSort 
            containerStyle={  { margin: 0 }} 
            bodyStyle={{ margin: 0 }}
            headerStyle={ {margin: 0}}
            tableStyle={ { margin: 0 } }
            options={ options }
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
                    <div className="card bg-light" id="nomargin">
                        <div className="card-header" id="nomargin">Outdated Library Not Found</div>
                        <div className="card-body" id="nomargin">
                            <p className="card-text">No information available. Due to no package.json in your repository</p>
                        </div>
                    </div>
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
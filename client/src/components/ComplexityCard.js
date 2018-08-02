import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ComplexityCard extends Component {
    
    render() {
        if( this.props.status === 'Available'){
          return (
            <BootstrapTable
            data={ this.props.data }
            containerStyle={  { margin: 0 }} 
            bodyStyle={{ margin: 0 }}
            headerStyle={ {margin: 0}}
            tableStyle={ { margin: 0 } }
            pagination striped hover> 
            <TableHeaderColumn dataField='file' isKey>File Name</TableHeaderColumn>
            <TableHeaderColumn dataField='comp'>COMP</TableHeaderColumn>
            <TableHeaderColumn dataField='numCommit'>Number of Commits</TableHeaderColumn>
            <TableHeaderColumn dataField='sloc'>Source Line of Code</TableHeaderColumn>
          </BootstrapTable>
          );
        }
        else {
          return(
            <div>
              <p>No complexity of your code.</p>
            </div>
          );
        }
    }
}

function mapStateToProps(state){
    return {
        data: state.update_complexity.data.resObj,
        status : state.update_complexity.status
    }
}

export default connect(mapStateToProps)(ComplexityCard)

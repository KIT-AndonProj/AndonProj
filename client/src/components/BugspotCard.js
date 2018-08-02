import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class BugspotCard extends Component {

    render() {
      if(this.props.status === 'Available'){
          return (
          <BootstrapTable 
          data={this.props.bugspot_data}
          containerStyle={  { margin: 0 }} 
          bodyStyle={{ margin: 0 }}
          headerStyle={ {margin: 0}}
          tableStyle={ { margin: 0 } }
          pagination striped hover>
          <TableHeaderColumn isKey dataField='file'>File Name</TableHeaderColumn>
          <TableHeaderColumn dataField='score'>Score</TableHeaderColumn>
          <TableHeaderColumn dataField='percentage'>Percentage</TableHeaderColumn>
      </BootstrapTable>
          );
        }else {
          return(
            <div>
             <p>No data shown. Bugspot score calculate the commit with 'fix' message in them.</p>
            </div>
          );
        }
        }

    }

    function mapStateToProps(state){
        return {
            bugspot_data: state.update_bugspot.data.score,
            status: state.update_bugspot.status
        }
    }
    

export default connect(mapStateToProps)(BugspotCard);
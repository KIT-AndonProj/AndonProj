import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class BugspotCard extends Component {

    render() {
      if(this.props.status === 'Available'){
        const options = {
            sizePerPageList: [ {
              text: 'All', value: this.props.data
            } ]
          };
          return (
          <BootstrapTable 
          data={this.props.bugspot_data}
          containerStyle={  { margin: 0 }} 
          bodyStyle={{ margin: 0 }}
          headerStyle={ {margin: 0}}
          tableStyle={ { margin: 0 } }
          options={ options }
          pagination striped hover>
          <TableHeaderColumn isKey dataField='file'>File Name</TableHeaderColumn>
          <TableHeaderColumn dataField='score'>Score</TableHeaderColumn>
          <TableHeaderColumn dataField='percentage'>Percentage</TableHeaderColumn>
      </BootstrapTable>
          );
        }else {
          return(
            <div>
            <div className="card bg-warning mb-3" id="nomargin">
                <div className="card-header" id="nomargin">Bugspot Analyze Not Found</div>
                <div className="card-body" id="nomargin">
                    <p className="card-text">Bugspot score calculate the commit with 'fix' message in them.</p>
                </div>
            </div>
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
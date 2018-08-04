import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class BugspotCard extends Component {

    render() {
      if(this.props.status === 'Available'){
        const options = {
            sizePerPageList: [ {
                text: 'All', value: this.props.bugspot_data.length
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
          <TableHeaderColumn isKey={true} dataField='file' dataSort={true}>File Name</TableHeaderColumn>
          <TableHeaderColumn dataField='score' dataSort={true}>Score</TableHeaderColumn>
          <TableHeaderColumn dataField='percentage' dataSort={true}>Percentage</TableHeaderColumn>
      </BootstrapTable>
          );
        }
        else if (this.props.status === 'Not Available'){
            return(
                <div>
                <div className="card text-white bg-danger mb-3" id="nomargin">
                    <div className="card-header" id="nomargin">Bugspot Analyze Not Available</div>
                    <div className="card-body" id="nomargin">
                        <p className="card-text">An error occured. Please check your network connection and try again.</p>
                    </div>
                </div>
            </div>
              );
        }
        else {
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
import React, {Component} from 'react'
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ComplexityCard extends Component {
    
    render() {
       
        if( this.props.status === 'Available'){
            const options = {
                sizePerPageList: [ {
                  text: 'All', value: this.props.data.length
                } ]
              };
          return (
            <BootstrapTable
            data={ this.props.data }
            containerStyle={  { margin: 0 }} 
            bodyStyle={{ margin: 0 }}
            headerStyle={ {margin: 0}}
            tableStyle={ { margin: 0 } }
            options={ options }
            pagination striped hover> 
            <TableHeaderColumn dataField='file' isKey={true} dataSort={true}>File Name</TableHeaderColumn>
            <TableHeaderColumn dataField='comp' dataSort={true}>COMP</TableHeaderColumn>
            <TableHeaderColumn dataField='numCommit' dataSort={true}>Number of Commits</TableHeaderColumn>
            <TableHeaderColumn dataField='sloc' dataSort={true}>Source Line of Code</TableHeaderColumn>
          </BootstrapTable>
          );
        }
        else if (this.props.status === 'Not Available'){
            return(
                <div>
                <div className="card bg-danger mb-3" id="nomargin">
                    <div className="card-header" id="nomargin">Code Complexity Not Available</div>
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
            <div className="card text-white bg-info mb-3" id="nomargin">
                <div className="card-header" id="nomargin">Complexity Not Found</div>
                <div className="card-body" id="nomargin">
                    <p className="card-text">Repository has no complexity</p>
                </div>
            </div>
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

import React, {Component} from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../stylesheets/table.css'
import { connect } from 'react-redux';
import '../stylesheets/complex.css';

class ComplexityCard extends Component {
    
    render() {
        if( this.props.status === 'available'){
          return (
            <div className="parallax-2">
            <div className="card-complex">
                <h2 id="header">Risk of Code Complexity</h2>
              <ReactTable
                data={this.props.data}
                columns={[
                      {
                        Header: "File",
                        accessor: "file"
                      },
                      {
                        Header: "COMP",
                      accessor:"comp"
                      },
                      {
                          Header: "Number of commit",
                          accessor:"numCommit"
                      },
                      {
                          Header:"Source Line of Code",
                          accessor: "sloc"
                      } 
                ]}
                defaultPageSize={10}
                style={{
                  height: "600px"
                }}
                className="-striped -highlight"
              />
              <br />
              </div>
            </div>
          );
        }
        else {
          return(
            <div className="parallax-2">
              <h2 id="header">Risk of Code Complexity</h2>
              <h2>No complexity of your code.</h2>
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

// import React, { Component } from 'react'
// import { push } from 'react-router-redux'
// import { connect } from 'react-redux'
// import { addCookie } from '../actions/cookieActions'
// import swal from 'sweetalert2'

// class Logout extends Component {
//     componentWillMount(){
//         this.props.cookie('');
//         swal({
//             title: "Logout Successful",
//             type: "success"
//         })
//         .then(() => {
//             this.props.push('/login');
//         })
//         render(){
//             return (
//                 <div></div>
//             );
//         }
//     }
// }

// function mapDispatchToProps(dispatch){
//     return {
//         cookie: (user_id) => dispatch(addCookie(user_id)),
//         push: (next_url) => dispatch(push(next_url))
//     }
// }

// export default connect(null, mapDispatchToProps)(Logout);
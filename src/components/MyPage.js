
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CustomBoard from your directory
import CustomBoard from './CustomBoard'

class MyPage extends Component {
  render() {
    return (
      <div style={{float: 'left', display:"flex", margin:"120px", padding:"120px"}}>
        <CustomBoard style={{margin:"50px"}} st={this.props.board19} size={19} boardId='id-5'/>
        <CustomBoard style={{margin:"50px"}} st={this.props.board13} size={13} boardId='id-4'/>
        <CustomBoard style={{margin:"50px"}} st={this.props.board9} size={9} boardId='id-3'/>
        <CustomBoard style={{margin:"50px"}} st={this.props.board9_6} size={9} boardId='id-6'/>
        <CustomBoard style={{margin:"50px"}} st={this.props.board9_7} size={9} boardId='id-7'/>
      </div>
    )
  }
}

// map state to props
const stateToProps = (state, props) => {
  return {
    // because we use undo reducer we must declare every props with .present
    board19: state.board19.present,
    board13: state.board13.present,
    board9: state.board9.present,
    board9_6: state.board9_6.present,
    board9_7: state.board9_7.present,
  }
}

export default connect(stateToProps, null)(MyPage)

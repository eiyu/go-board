import React, {Component} from 'react';
import PropType from 'prop-types'
import {putStone} from '../actions/boardActions'
import {connect} from 'react-redux'
class CustomStone extends Component {

  render() {
    return (
      <div
      key={this.props.coor}
      style={{color:this.props.color, padding:0, margin:'0px', width:'0px'}}
      onClick={() => this.props.onMove(this.props.coor, this.props.turns)}
      >{this.props.value}</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // onMove: (coor, turns) => dispatch(putStone(coor, turns))
})

export default connect(null, mapDispatchToProps)(CustomStone)

//

CustomStone.propType = {
  onMove: PropType.func,
  evaluateGame: PropType.func,
  points: PropType.object,
  turns: PropType.string,
  id: PropType.string,
  evaluated: PropType.bool
}

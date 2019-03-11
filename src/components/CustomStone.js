import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux'
import {capturing} from '../actions/tutorialActions'
class CustomStone extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }
  render() {
    return (
      <div
      key={this.props.coor}
      style={{color:this.props.color, padding:0, margin:'0px', width:'0px'}}
      onClick={() => this.props.onMove(this.props.coor, this.props.turns, this.props.size, this.props.switching)}
      >
      <span onClick={
        () => this.props.value==='+'&&this.props.color!=='brown' ? this.props.onCapturing() : void 0
      }>
      {/*this.props.value==='+'&&this.props.color!=='brown' ? this.props.oppLiberty :*/ this.props.value}
      </span></div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onCapturing: () => dispatch(capturing())
})

export default connect(null, mapDispatchToProps)(CustomStone)

//

CustomStone.propType = {
  onMove: PropType.func,
  onWhite: PropType.func,
  evaluateGame: PropType.func,
  points: PropType.object,
  turns: PropType.string,
  id: PropType.string,
  evaluated: PropType.bool
}

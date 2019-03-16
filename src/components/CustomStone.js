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
      className="coordinate"
      key={this.props.coor}
      onClick={() => this.props.onMove(this.props.coor, this.props.turns, this.props.size, this.props.switching)}
      >

      {this.props.value === '+' ? '+' : <img src={`./${this.props.color}.png`} alt={this.props.color}/>}
    </div>
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

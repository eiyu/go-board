import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import Board from './Board'
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
// import {removeStone, undo} from '../actions/playerActions'

// constants
const length = 19

class LandingPage extends Component {
  render() {
    return (
      <Container>
      {/*<Board silver={this.props.silver} black={this.props.black} evaluate={this.props.evaluate} turns={this.props.turns} points={this.props.points}/>*/}
         <CustomBoard board={this.props.board} turns={this.props.turns} size={9} /><br/>
      </Container>
    )
  }
}


LandingPage.propType = {
  board: PropType.object
}

const stateToProps = (state, props) => {
  const {game,silver,black, ...points} = state
  // console.log(state);
  return {
    // points: points,
    turns: game.turns,
    board: state.board,
    // lastMove: game.lastMove,
    // silver,
    // black,
    // evaluate: game.evaluate

  }
}

const dispatchToProps = dispatch => {
  return {
    // onRemove: id => dispatch(removeStone(id)),
    // onUndo: stone => undo(dispatch)(stone)
  }
}
export default connect(stateToProps, dispatchToProps)(LandingPage)

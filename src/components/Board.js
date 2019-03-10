import React, {Component} from 'react';
import PropType from 'prop-types'
import Grid from './styled/Grid'
import Row from './styled/Row'
import Col from './styled/Col'
import {connect} from 'react-redux'
import Stone from './Stone'
import {putStone} from '../actions/playerActions'
import {evaluateGame} from '../actions/gameActions'
class Board extends Component {
constructor() {
  super()
  this.evaluateGame = this.evaluateGame.bind(this)
}
  componentDidUpdate() {
    // if not
    // if(!this.props.evaluate) {
    //   this.props.onEvaluateGame(this.props)
    // }
  }

  evaluateGame(data,evaluated) {
    this.props.onEvaluateGame(data,evaluated)
  }

  render() {

    return (
      <div style={{cursor: "pointer"}}>
        <Grid style={{width:"180px", padding:0}}>
        <Row>
        {
          Object.keys(this.props.points).map(key => {
            return <Stone allStone = {this.props[this.props.turns]} evaluated={this.props.evaluated} data={this.props.points[key].present} key={key} evaluateGame={this.evaluateGame} onMove={this.props.onMove} id={key} points={this.props.presentPoints} turns={this.props.turns} />
          })
        }
        </Row>
        </Grid>
      </div>
    )
  }
}

//

Board.propType = {
  points: PropType.object
}

const dispatchToProps = (dispatch, props) => {

  return {
    onMove: (key,turn,boardState, stone, allStone,ko) => putStone(dispatch)(key,turn,boardState, stone, allStone,ko),
    onEvaluateGame: (data,evaluated) => evaluateGame(dispatch)(data,evaluated)
  }
}

const stateToProps = (state, props) => {
  const presentState = Object.keys(props.points).reduce((prev,x) => {
    Object.assign(prev, {[x]: props.points[x].present})
    return prev
  }, {})
  return {
    presentPoints: presentState,
    evaluated: state.game.evaluate
  }
}
export default connect(stateToProps,dispatchToProps)(Board)

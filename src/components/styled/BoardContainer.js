import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Board from './Board'
import { Col } from 'react-styled-flexboxgrid'
import {switchBoard} from '../actions/boardContainerActions'

class BoardContainer extends React.Component {

  constructor() {
    super()
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e, item) => {

  }

  render() {
    return (
      <Col xs={10} md={3} lg={3}>
      <button onClick={() => this.props.onSwitchBoard(1,2)}> Switch Board </button>
        <Board {...this.props}/>
      </Col>)
  }
}
// }

BoardContainer.propTypes = {
  containers: PropTypes.array,
  cards: PropTypes.object,
  boardName:PropTypes.string,
  color:PropTypes.string,
  onSwitchBoard: PropTypes.func
}
const mapDispatchToProps = dispatch => ({
  onSwitchBoard: (a,b) => dispatch(switchBoard(a,b))
})

const stateToProps = (state, props) => ({
  containers: state.containers,
})

export default connect(stateToProps,mapDispatchToProps)(BoardContainer)


import React, {Component} from 'react';
import PropType from 'prop-types'
import Row from './styled/Row'
import Col from './styled/Col'
import {connect} from 'react-redux'
import {putStone} from '../actions/gameActions'
import Points from './Points'
class Line extends Component {
  render() {
    const key = Object.keys(this.props)[0]
    return (
      <Row>
      {
        Object.keys(this.props[key]).map(n => {
          return (<Col style={{color: "yellow"}} key={n} ><Points name={n} turn={this.props.turns} onMove={this.props.onMove} /></Col>)
        })
      }
      </Row>
    )
  }
}

//

Line.propType = {
  board: PropType.object,
  length: PropType.number
}

export default Line

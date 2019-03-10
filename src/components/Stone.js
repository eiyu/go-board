import React, {Component} from 'react';
import PropType from 'prop-types'
import Col from './styled/Col'
export default class Stone extends Component {

  componentDidUpdate() {
    // if
    // if(this.props.data.liberty < 1 ) {
    //
    //   console.log(this.props.data.liberty, this.props.evaluated);
    //   this.props.evaluateGame(this.props.data, this.props.evaluated)
    // }
  }

  render() {
    console.log(this.props.data);
    return (
      <Col lg={1} md={1} sm={1} xs={1}
      // {...this.props.points[this.props.id]}
      style={{width:"20px", color:this.props.data.color, padding:0}}
      onClick={() => this.props.onMove(this.props.id, this.props.turns, this.props.points, this.props.data, this.props.allStone.attaches, this.props.data.ko)}
      >{this.props.data.value}</Col>
    )
  }
}

//

Stone.propType = {
  onMove: PropType.func,
  evaluateGame: PropType.func,
  points: PropType.object,
  turns: PropType.string,
  id: PropType.string,
  evaluated: PropType.bool
}

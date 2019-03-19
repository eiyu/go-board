import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import {putStone} from '../actions/boardActions'
import CustomBoard from './CustomBoard'
import {Row, Col} from 'react-styled-flexboxgrid'
import {NavLink} from 'react-router-dom'


const selectedStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "10px",
}
class Capturing extends Component {

    componentDidMount() {
      const moves = [
        [2,1],[2,2],[2,3],'pass',[3,2],'pass',
      ]
      const playing = (moves) => {
        moves.forEach((move,x) => {
          this.props.onPutStone( move, 5)
        })
      }
      setTimeout(function(){ playing(moves) }, 0);
    }
  render() {
    return (
        <Container>
        <Row>
        <Col><h1> Menangkap Batu Lawan </h1></Col>
        </Row>
        <Row>
          <Col><CustomBoard switching={true} st={this.props.st} size={this.props.size} /></Col>
        </Row>
        <Row>
        <Col>
         <h3>Penjelasan</h3>
         <ul>
           <li>Batu putih diatas memiliki 4 liberty / nafas</li>
           <li>Batu hitam diletakkan tepat dititik liberty batu lawan</li>
           <li>Setelah tidak ada liberty yang tersisa batu lawan dapat diambil</li>
         </ul>
        </Col>
        </Row>
        <Row>
        <Col>
         <h3>Langkah</h3>
         <ul>
           <li>Letakan batu hitam di bagian atas batu putih untuk menangkap</li>
         </ul>
        <NavLink activeStyle={selectedStyle} to="/aturan-dasar"><Col lg={3} md={2} sm={3} xs={2}>Aturan dasar</Col></NavLink>
        <NavLink activeStyle={selectedStyle} to="/peraturan-ko"><Col lg={3} md={2} sm={3} xs={2}>Peraturan Ko</Col></NavLink>
        </Col>
        </Row>
      </Container>
    )
  }
}

Capturing.propType = {
  board: PropType.object,
  turns: PropType.string,
  size: PropType.number,
}

const dispatchToProps = (dispatch, props) => {
  return {
    onPutStone: (coor, size) => putStone(dispatch,props.st.points, props.st.turns)(coor, size),
    // onRemove: id => dispatch(removeStone(id)),
  }
}
export default connect(null, dispatchToProps)(Capturing)

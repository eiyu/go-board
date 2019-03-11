import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import {putStone} from '../actions/boardActions'
import CustomBoard from './CustomBoard'
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
import {NavLink} from 'react-router-dom'
// import {removeStone, undo} from '../actions/playerActions'
import {ThemeProvider} from 'styled-components'
const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 2, // columns
    gutterWidth: 3, // rem
    outerMargin: 3, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 47, // rem
      lg: 70  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 50, // em
      lg: 75  // em
    },
  }
}
class Capturing extends Component {

  componentDidMount() {
    return this.props.onPutStone([2,2], 'white', 5)
  }
  render() {
    return (
      <Container>
      <ThemeProvider theme={theme}>
        <Grid>
        <Row>
        <Col><h1> Menangkap Batu Lawan </h1></Col>
        </Row>
        <Row>
          <Col><CustomBoard switching={false} history={this.props.history} play={1} board={this.props.board} turns={this.props.turns} size={this.props.size} /></Col>
        </Row>
        <Row>
        <Col>
         <h3>Aturan</h3>
         <ul>
           <li>Batu putih diatas memiliki 4 liberty / nafas</li>
           <li>Batu hitam diletakkan dititik liberty batu lawan</li>
           <li>Setelah tidak ada liberty yang tersisa batu lawan dapat diambil</li>
         </ul>
        </Col>
        </Row>
        <Row>
        <Col>
         <h3>Langkah</h3>
         <ul>
           <li>Letakan batu hitam di bagian atas, bawah, kiri dan kanan</li>
           <li>Dalam contoh ini urutannya tidak menjadi masalah</li>
           <li>Setelah liberty batu putih habis maka batu tersebut dapat di ambil</li>
         </ul>
        </Col>
        <Col><NavLink to="/peraturan-ko"><button>Ko rules</button></NavLink></Col>
        </Row>
        </Grid>
        </ThemeProvider>
      </Container>
    )
  }
}


Capturing.propType = {
  board: PropType.object
}

const dispatchToProps = (dispatch, props) => {
  return {
    onPutStone: (coor,turns, size, switching) => putStone(dispatch,props.board)(coor,turns, size, switching),
    // onRemove: id => dispatch(removeStone(id)),
  }
}
export default connect(null, dispatchToProps)(Capturing)

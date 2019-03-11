import React, {Component} from 'react';
import PropType from 'prop-types'
import {connect} from 'react-redux';
import {Container} from './styled/Wraper'
import CustomBoard from './CustomBoard'
import {NavLink} from 'react-router-dom'
import {putStone} from '../actions/boardActions'
import {Grid, Row, Col} from 'react-styled-flexboxgrid'
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

class Ko extends Component {
  componentDidMount() {
    const moves = [
      [1,0],[2,0],[2,1],[3,1],[1,2],[2,2],[0,1],[5,4],[5,3],[4,5],[4,4]
    ]
    const playing = (moves) => {
      moves.forEach((move,x) => {
        this.props.onPutStone( move, (x%2===0 ? 'black':'white') ,6)
      })
    }
    setTimeout(function(){ playing(moves) }, 500);
  }
  render() {
    return (
      <Container>
      <ThemeProvider theme={theme}>
        <Grid>
        <Row>
        <Col><h1> Peraturan Ko </h1></Col>
        </Row>
        <Row>
          <Col><CustomBoard switching={true} board={this.props.board} turns={this.props.turns} size={this.props.size} /></Col>
        </Row>
        <Row>
        <Col>
         <h3>Pengertian</h3>
         <div className="desc">
          Sebuah situasi dimana seorang pemain tidak dapat meletakkan batu dititik tersebut dikarenakan kondisi shape yang sama dengan lawan, untuk itu langkah selanjutnya dititik yang sama hanya bisa dijalankan lagi setelah membuang satu langkah di tempat lain.
         </div>
         <h3>Contoh Kasus</h3>
          <ul>
            <li>letakan batu di pojok kanan paling bawah untuk memakan batu putih</li>
            <li>sekarang sekarang putih tidak dapat memakan batu hitam yang ada di pojok kanan, dikarenakan peraturan ko</li>
            <li>langkah putih selanjutnya adalah dengan meletakkan batu ditempat lain</li>
            <li>setelah hitam jalan barulah putih dapat memakan batu hitam yang ada di pojok kanan bawah</li>
            <li>di bagian pojok kiri atas terdapat kasus yang serupa</li>
            <li>silahkan dicoba :)</li>
            <li>cukup refresh tab / tekan tombol ulang jika ingin mengulang</li>
          </ul>
        </Col>
        <Col><NavLink to="/"><button>Kembali</button></NavLink></Col>
        </Row>
        </Grid>
        </ThemeProvider>
      </Container>
    )
  }
}


Ko.propType = {
  board: PropType.object
}


const dispatchToProps = (dispatch, props) => {
  return {
    onPutStone: (coor,turns, size, switching) => putStone(dispatch,props.board)(coor,turns, size, switching),
    // onRemove: id => dispatch(removeStone(id)),
  }
}
export default connect(null, dispatchToProps)(Ko)
